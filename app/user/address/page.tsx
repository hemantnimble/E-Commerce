"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface Address {
    id: number
    name: string
    street: string
    city: string
    state: string
    zip: string
    isDefault: boolean
}

export default function Addresses() {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [editingAddress, setEditingAddress] = useState<Address | null>(null)

    const handleAddAddress = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newAddress: Address = {
            id: Date.now(),
            name: formData.get("name") as string,
            street: formData.get("street") as string,
            city: formData.get("city") as string,
            state: formData.get("state") as string,
            zip: formData.get("zip") as string,
            isDefault: addresses.length === 0,
        }
        setAddresses([...addresses, newAddress])
        event.currentTarget.reset()
    }

    const handleEditAddress = (address: Address) => {
        setEditingAddress(address)
    }

    const handleUpdateAddress = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const updatedAddress: Address = {
            ...editingAddress!,
            name: formData.get("name") as string,
            street: formData.get("street") as string,
            city: formData.get("city") as string,
            state: formData.get("state") as string,
            zip: formData.get("zip") as string,
        }
        setAddresses(addresses.map(a => a.id === updatedAddress.id ? updatedAddress : a))
        setEditingAddress(null)
    }

    const handleDeleteAddress = (id: number) => {
        setAddresses(addresses.filter(a => a.id !== id))
    }

    const handleSetDefaultAddress = (id: number) => {
        setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })))
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Addresses</h1>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Addresses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {addresses.length === 0 ? (
                            <p>No addresses saved yet.</p>
                        ) : (
                            <RadioGroup
                                defaultValue={addresses.find(a => a.isDefault)?.id.toString()}
                                onValueChange={(value) => handleSetDefaultAddress(Number(value))}
                            >
                                {addresses.map((address) => (
                                    <div key={address.id} className="flex items-center space-x-2 mb-4">
                                        <RadioGroupItem value={address.id.toString()} id={`address-${address.id}`} />
                                        <Label htmlFor={`address-${address.id}`} className="flex-grow">
                                            <div>
                                                <p className="font-medium">{address.name}</p>
                                                <p className="text-sm text-muted-foreground">{address.street}</p>
                                                <p className="text-sm text-muted-foreground">{`${address.city}, ${address.state} ${address.zip}`}</p>
                                            </div>
                                        </Label>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="icon" onClick={() => handleEditAddress(address)}>
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="sr-only">Edit address</span>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Address</DialogTitle>
                                                </DialogHeader>
                                                <form onSubmit={handleUpdateAddress} className="space-y-4">
                                                    <div>
                                                        <Label htmlFor="edit-name">Full Name</Label>
                                                        <Input id="edit-name" name="name" defaultValue={address.name} required />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="edit-street">Street Address</Label>
                                                        <Input id="edit-street" name="street" defaultValue={address.street} required />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="edit-city">City</Label>
                                                        <Input id="edit-city" name="city" defaultValue={address.city} required />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="edit-state">State</Label>
                                                        <Input id="edit-state" name="state" defaultValue={address.state} required />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="edit-zip">ZIP Code</Label>
                                                        <Input id="edit-zip" name="zip" defaultValue={address.zip} required />
                                                    </div>
                                                    <Button type="submit">Update Address</Button>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                        <Button variant="outline" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete address</span>
                                        </Button>
                                    </div>
                                ))}
                            </RadioGroup>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Add New Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddAddress} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name" required />
                            </div>
                            <div>
                                <Label htmlFor="street">Street Address</Label>
                                <Input id="street" name="street" required />
                            </div>
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input id="city" name="city" required />
                            </div>
                            <div>
                                <Label htmlFor="state">State</Label>
                                <Input id="state" name="state" required />
                            </div>
                            <div>
                                <Label htmlFor="zip">ZIP Code</Label>
                                <Input id="zip" name="zip" required />
                            </div>
                            <Button type="submit">Add Address</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}