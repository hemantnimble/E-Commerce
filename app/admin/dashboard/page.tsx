"use client"
import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { MoreHorizontal, Search, ShoppingBag, ShoppingCart, Users, Package, DollarSign, Menu, Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"


interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
  images: string[],
  createdAt: string;
  updatedAt: string;
}
interface Orders {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  order: {
    id: string;
    userId: string;
    paymentIntentId: string;
    createdAt: string;
    updatedAt: string;
    user: {
      name: string
    }
  };
  product: {
    id: string,
    title: string,
    price: number,
    category: string,
    images: string[],
    stock: number,
  }
}
export default function Component() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [stock, setStock] = useState<number | string>('');
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Orders[]>([])
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<{ products: Product[] }>("/api/products/getproducts")
      setProducts(response.data.products)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ orders: Orders[] }>("/api/admin/orders/get")
      setOrders(response.data.orders);
      calculateTotalRevenue(response.data.orders);
      calculateUniqueUsers(response.data.orders);
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [])

  const updateProduct = async (id: string) => {

    try {
      await axios.put("/api/admin/product/updatestock", { id, stock });
      alert("Stock updated");
      fetchProducts();
    } catch (error: any) {
      alert("Error updating stock.");
    }
  };

  const deleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.post("/api/products/delete", { id });
        alert("Product deleted");
        fetchProducts();
      } catch (error: any) {
        alert("Error deleting product.");
      }
    }
  };

  const calculateTotalRevenue = (orders: Orders[]) => {
    const total = orders.reduce((acc: number, order) => acc + order.product.price, 0);
    setTotalRevenue(total);
  };

  function calculateUniqueUsers(orders: Orders[]) {
    const uniqueUsers = new Set();
    orders.forEach(order => {
      uniqueUsers.add(order.order.userId);
    });
    setTotalCustomers(uniqueUsers.size);
  }
  const data = [
    {
      name: "Jan",
      total: orders.reduce((acc: number, order) => acc + order.product.price, 0),
    },
    {
      name: "Feb",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Mar",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Apr",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "May",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Jun",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ]
  console.log(orders)
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
              </TabsList>
              <TabsContent value="dashboard">
                <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Revenue
                      </CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        $ {loading ? "loading..." : totalRevenue}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        New Customers
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalCustomers}</div>
                      <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Sales</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+12,234</div>
                      <p className="text-xs text-muted-foreground">
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Now
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+573</div>
                      <p className="text-xs text-muted-foreground">
                        +201 since last hour
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Chart */}
                <div className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={data}>
                          <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders */}
                <div className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>
                        You have {orders.length} orders this month.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Order</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.product.title}</TableCell>
                              <TableCell>pendingg</TableCell>
                              <TableCell>{order.order.user.name} </TableCell>
                              <TableCell className="text-right">
                                $ {order.product.price}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="products">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-gray-700 text-3xl font-medium">Products</h3>
                  <Link href="/admin/add">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add New Product
                    </Button>
                  </Link>
                </div>
                <Card>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>${product.price}</TableCell>
                            <TableCell>
                              {product.stock}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                {/* <Dialog>
                                  <DialogTrigger asChild>
                                    
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Edit Product</DialogTitle>
                                      <DialogDescription>
                                        Make changes to the product here. Click save when you are done.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="edit-name" className="text-right">
                                          Name
                                        </Label>
                                        <Input id="edit-name" className="col-span-3" />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="edit-price" className="text-right">
                                          Price
                                        </Label>
                                        <Input id="edit-price" type="number" className="col-span-3" />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="edit-stock" className="text-right">
                                          Stock
                                        </Label>
                                        <Input id="edit-stock" type="number" className="col-span-3" />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button type="submit">Save Changes</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog> */}
                                <Link href={`/admin/updateproduct/${product.id}`}>
                                  <Button variant="outline" size="sm" >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <Button variant="outline" size="sm" onClick={() => deleteProduct(product.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      Stock
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Update Stock</DialogTitle>
                                      <DialogDescription>
                                        Adjust the stock level for this product.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="stock-update" className="text-right">
                                          New Stock Level
                                        </Label>
                                        <Input onChange={(e: any) => setStock(e.target.value)} id="stock-update" type="number" className="col-span-3" />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button onClick={() => updateProduct(product.id)}>Update Stock</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}