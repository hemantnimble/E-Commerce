import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
    zipCode: string
    isDefault: boolean
}

function AddressSection() {
    const [addAddress, setAddAddress] = useState(false);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [editAddressId, setEditAddressId] = useState<number | null>(null); // for editing address
    const [message, setMessage] = useState('');

    // Fetch addresses from API
    const fetchAddresses = async () => {
        try {
            const response = await axios.get("/api/user/addresses/get");
            setAddresses(response.data.addresses);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    // Add a new address
    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/addresses/add', {
                name,
                street,
                city,
                state,
                zipCode,
            });
            setMessage(response.data.message);
            setAddAddress(false);
            fetchAddresses(); // Refresh address list after adding
        } catch (error) {
            setMessage('Failed to add address');
        }
    };

    // Edit an address
    const handleEditAddress = (address: Address) => {
        setEditAddressId(address.id);
        setName(address.name);
        setStreet(address.street);
        setCity(address.city);
        setState(address.state);
        setZipCode(address.zipCode);
    };

    // Update the edited address
    const handleUpdateAddress = async (addressId: any, e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`/api/user/addresses/update`, {
                name,
                street,
                city,
                state,
                zip: zipCode,
                addressId: addressId
            });
            setMessage("Address updated successfully");
            setEditAddressId(null); // Close the edit dialog
            fetchAddresses(); // Refresh the address list
        } catch (error) {
            setMessage('Failed to update address');
        }
    };

    // Delete an address
    const handleDeleteAddress = async (addressId: any) => {
        try {
            await axios.post(`/api/user/addresses/delete`, { addressId });
            setMessage("Address deleted successfully");
            fetchAddresses(); // Refresh the address list after deleting
        } catch (error) {
            setMessage('Failed to delete address');
        }
    };

    // Set a default address
    const handleSetDefaultAddress = async (addressId: number) => {
        try {
            await axios.put(`/api/user/addresses/set-default/${addressId}`);
            fetchAddresses(); // Refresh the address list to reflect default address
        } catch (error) {
            setMessage('Failed to set default address');
        }
    };

    return (
        <section>
            <Card>
                <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
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
                                            <p className="text-sm text-muted-foreground">{`${address.city}, ${address.state} ${address.zipCode}`}</p>
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
                                            <form onSubmit={(e) => handleUpdateAddress(address.id, e)} className="space-y-4">
                                                <div>
                                                    <Label htmlFor="edit-name">Full Name</Label>
                                                    <Input id="edit-name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                                </div>
                                                <div>
                                                    <Label htmlFor="edit-street">Street Address</Label>
                                                    <Input id="edit-street" name="street" value={street} onChange={(e) => setStreet(e.target.value)} required />
                                                </div>
                                                <div>
                                                    <Label htmlFor="edit-city">City</Label>
                                                    <Input id="edit-city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                                                </div>
                                                <div>
                                                    <Label htmlFor="edit-state">State</Label>
                                                    <Input id="edit-state" name="state" value={state} onChange={(e) => setState(e.target.value)} required />
                                                </div>
                                                <div>
                                                    <Label htmlFor="edit-zip">ZIP Code</Label>
                                                    <Input id="edit-zip" name="zip" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
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
                    <Button onClick={() => setAddAddress(true)}>Add New Address</Button>
                </CardContent>
            </Card>

            {/* Add Address Dialog */}
            <Dialog open={addAddress} onOpenChange={setAddAddress}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                        <DialogDescription>
                            Enter your new address details below.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddAddress} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="street">Street Address</Label>
                            <Input id="street" name="street" value={street} onChange={(e) => setStreet(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="state">State</Label>
                            <Input id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input id="zip" name="zip" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
                        </div>
                        <Button type="submit">Add Address</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    )
}

export default AddressSection