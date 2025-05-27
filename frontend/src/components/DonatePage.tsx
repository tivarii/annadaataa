"use client"

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import "@solana/wallet-adapter-react-ui/styles.css"
import { useWallet } from "@solana/wallet-adapter-react"
import { Transaction } from "@solana/web3.js"
import { Connection, PublicKey, LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, Send, CheckCircle, AlertCircle, Wallet } from "lucide-react"
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FaHome } from "react-icons/fa"

function DonationForm() {
    const { publicKey, signTransaction, connect, wallets, select } = useWallet()
    const [recipientAddress, setRecipientAddress] = useState("")
    const [amount, setAmount] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    const styleClasses =
        "block w-full rounded-md border border-gray-600 bg-gray-800 py-2.5 px-4 text-sm text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-0"

    const handleDonate = async () => {
        // If wallet is not connected, try to connect automatically
        if (!publicKey) {
            try {
                // Try to select the first available wallet and connect
                // Instead of auto-connecting, show the wallet modal
                if (wallets.length > 0) {
                    // Open the wallet selection modal
                    document.querySelector('.wallet-adapter-button-trigger')?.dispatchEvent(
                        new MouseEvent('click', { bubbles: true })
                    );
                    return; // Exit here, user can try donation again after choosing a wallet
                } else {
                    setError("No wallet adapters found. Please install a Solana wallet.")
                    return
                }
            } catch (error: any) {
                setError("Failed to connect wallet. Please try connecting manually.")
                return
            }
        }

        if (!recipientAddress || !amount) {
            setError("Please fill in all fields.")
            return
        }

        if (isNaN(Number(amount)) || Number(amount) <= 0) {
            setError("Please enter a valid amount.")
            return
        }

        setLoading(true)
        setError("")
        setSuccess(false)

        try {
            // Create a new connection to the Solana network
            const connection = new Connection("https://api.devnet.solana.com", "confirmed")

            // Convert recipient address string to PublicKey
            const recipientPublicKey = new PublicKey(recipientAddress)

            // Create a new transaction
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: recipientPublicKey,
                    lamports: Number(amount) * LAMPORTS_PER_SOL,
                }),
            )

            // Set recent blockhash and fee payer
            const { blockhash } = await connection.getLatestBlockhash()
            transaction.recentBlockhash = blockhash
            transaction.feePayer = publicKey

            // Sign the transaction
            const signedTransaction = await signTransaction!(transaction)

            // Send the transaction
            const signature = await connection.sendRawTransaction(signedTransaction.serialize())

            // Wait for confirmation
            await connection.confirmTransaction(signature, "confirmed")

            setSuccess(true)
            setRecipientAddress("")
            setAmount("")
            console.log(`Transaction successful! Signature: ${signature}`)
        } catch (error: any) {
            console.error("Transaction failed", error)
            setError(`Transaction failed: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="bg-[#111827] text-white min-h-screen flex flex-col">
            {/* Header with Menu and Wallet Buttons */}
            <div className="flex justify-between items-center p-6">
                <Link to="/home">
                    <FaHome className="text-white text-xl" />
                </Link>

                <div className="flex items-center space-x-4">
                    <WalletMultiButton />
                    {publicKey && <WalletDisconnectButton />}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-4xl mx-auto p-8 w-full">
                    <div className="space-y-2 text-center">
                        <div>
                            <h1 className="text-5xl font-bold mb-4">Send Donation</h1>
                            <p className="text-xl mb-8">Support your favorite causes by sending SOL directly to their wallet</p>

                            {/* Wallet Status */}
                            <div className="mb-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
                                <div className="flex items-center justify-center space-x-3">
                                    <Wallet className="w-5 h-5 text-purple-400" />
                                    <span className="text-gray-300">
                                        {publicKey
                                            ? `Connected: ${publicKey.toBase58().slice(0, 8)}...${publicKey.toBase58().slice(-8)}`
                                            : "Wallet not connected - Click 'Send Donation' to connect automatically"}
                                    </span>
                                </div>
                            </div>

                            {/* Success Alert */}
                            {success && (
                                <Alert className="mb-6 bg-green-900/50 border-green-700">
                                    <CheckCircle className="h-4 w-4 text-green-400" />
                                    <AlertDescription className="text-green-300">
                                        Transaction successful! Your donation has been sent.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Error Alert */}
                            {error && (
                                <Alert className="mb-6 bg-red-900/50 border-red-700">
                                    <AlertCircle className="h-4 w-4 text-red-400" />
                                    <AlertDescription className="text-red-300">{error}</AlertDescription>
                                </Alert>
                            )}

                            <form
                                className="space-y-6"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleDonate()
                                }}
                            >
                                <div className="grid gap-6">
                                    <div>
                                        <Label htmlFor="recipient">Recipient Address</Label>
                                        <Input
                                            id="recipient"
                                            name="recipient"
                                            className={styleClasses}
                                            value={recipientAddress}
                                            onChange={(e) => setRecipientAddress(e.target.value)}
                                            placeholder="Enter the public address whom you want to send money"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="amount">Amount (SOL)</Label>
                                        <Input
                                            id="amount"
                                            name="amount"
                                            className={styleClasses}
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Enter the amount to donate"
                                            type="number"
                                            step="0.001"
                                            min="0"
                                            required
                                        />
                                    </div>

                                    {/* Quick Amount Buttons */}
                                    <div>
                                        <Label>Quick amounts:</Label>
                                        <div className="grid grid-cols-4 gap-2 mt-2">
                                            {["0.1", "0.5", "1.0", "2.0"].map((quickAmount) => (
                                                <Button
                                                    key={quickAmount}
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setAmount(quickAmount)}
                                                    className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                                                >
                                                    {quickAmount} SOL
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Processing Transaction...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <Send className="w-4 h-4" />
                                            <span>Send Donation</span>
                                        </div>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function DonatePage() {
    return (
        <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <DonationForm />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
