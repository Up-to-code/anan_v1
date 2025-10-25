"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { CopyableText } from '@/components/ui/CopyableText';
import { Badge } from '@/components/ui/Badge';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { Modal } from '@/components/ui/Modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import { Pagination } from '@/components/ui/Pagination';
import { Progress } from '@/components/ui/Progress';
import { Toggle } from '@/components/ui/Toggle';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Avatar } from '@/components/ui/Avatar';
import { Tooltip } from '@/components/ui/Tooltip';
import { Skeleton } from '@/components/ui/Skeleton';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Select, SelectItem } from '@/components/ui/Select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { DataGrid } from '@/components/ui/DataGrid';
import { Form, FormField, FormLabel, FormDescription, FormError } from '@/components/ui/Form';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Sidebar, SidebarHeader, SidebarContent } from '@/components/layout/Sidebar';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { ToastProvider, useToast } from '@/components/ui/Toast';
import { 
  Search, 
  User, 
  Mail, 
  Settings, 
  Download, 
  Upload, 
  Plus,
  ChevronDown,
  Star,
  Heart,
  Calendar,
  Clock
} from 'lucide-react';

// Demo data for tables
const tableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
];

const dataGridData = [
  { id: 1, product: 'Laptop', category: 'Electronics', price: 999.99, stock: 15 },
  { id: 2, product: 'Desk Chair', category: 'Furniture', price: 199.99, stock: 8 },
  { id: 3, product: 'Notebook', category: 'Office', price: 12.99, stock: 50 },
];

function DemoContent() {
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(30);
  const [toggleState, setToggleState] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [image, setImage] = useState('');
  const [activeTab, setActiveTab] = useState('buttons');
  const [accordionValue, setAccordionValue] = useState('');

  const steps = [
    { id: '1', label: 'Step 1', description: 'Account setup' },
    { id: '2', label: 'Step 2', description: 'Profile information' },
    { id: '3', label: 'Step 3', description: 'Confirmation' },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Library', href: '#' },
    { label: 'Data', href: '#' },
  ];

  const dataGridColumns = [
    { key: 'product', title: 'Product', width: '200px' },
    { key: 'category', title: 'Category' },
    { key: 'price', title: 'Price', render: (value: number) => `$${value.toFixed(2)}` },
    { key: 'stock', title: 'Stock', render: (value: number) => (
      <Badge variant={value > 10 ? 'success' : value > 0 ? 'warning' : 'error'}>
        {value} in stock
      </Badge>
    )},
  ];

  return (
    <Container size="xl" className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">UI Components Demo</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          A comprehensive showcase of all available UI components with different states and variations.
        </p>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
        <TabsList className="w-full max-w-2xl mx-auto mb-8">
          <TabsTrigger value="buttons">Buttons & Inputs</TabsTrigger>
          <TabsTrigger value="display">Display Components</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="data">Data Display</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        {/* Buttons & Inputs Tab */}
        <TabsContent value="buttons">
          <Grid cols={2} gap="lg" className="mb-12">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Buttons</h3>
                <p className="text-slate-600">Various button styles and states</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="danger">Danger Button</Button>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button leftIcon={<Plus className="w-4 h-4" />}>With Left Icon</Button>
                  <Button rightIcon={<Download className="w-4 h-4" />}>With Right Icon</Button>
                  <Button isLoading>Loading Button</Button>
                  <Button disabled>Disabled Button</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Input Fields</h3>
                <p className="text-slate-600">Different input types and states</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Basic input" />
                <Input label="With Label" placeholder="Enter your name" />
                <Input 
                  label="With Icons" 
                  placeholder="Search..." 
                  leftIcon={<Search className="w-4 h-4" />}
                />
                <Input 
                  label="Error State" 
                  placeholder="Invalid input" 
                  error="This field is required"
                />
                <Input 
                  type="password" 
                  label="Password" 
                  placeholder="Enter password" 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Select Dropdown</h3>
                <p className="text-slate-600">Custom select component</p>
              </CardHeader>
              <CardContent>
                <Select value={selectedValue} onValueChange={setSelectedValue} placeholder="Select an option">
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </Select>
                <p className="text-sm text-slate-500 mt-2">Selected: {selectedValue || 'None'}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Toggle Switch</h3>
                <p className="text-slate-600">Interactive toggle component</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Toggle 
                    checked={toggleState} 
                    onCheckedChange={setToggleState}
                  />
                  <span>Toggle is {toggleState ? 'on' : 'off'}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <Toggle 
                    checked={true} 
                    onCheckedChange={() => {}}
                    size="sm"
                  />
                  <span>Small toggle</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <Toggle 
                    checked={false} 
                    onCheckedChange={() => {}}
                    size="lg"
                  />
                  <span>Large toggle</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Image Upload</h3>
                <p className="text-slate-600">File upload with preview</p>
              </CardHeader>
              <CardContent>
                <ImageUpload value={image} onChange={setImage} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Form Example</h3>
                <p className="text-slate-600">Complete form with validation</p>
              </CardHeader>
              <CardContent>
                <Form onSubmit={(e) => { e.preventDefault(); addToast({ title: 'Form submitted!' }); }}>
                  <FormField>
                    <FormLabel htmlFor="name" required>Full Name</FormLabel>
                    <Input id="name" placeholder="Enter your name" />
                    <FormDescription>This is your display name</FormDescription>
                  </FormField>
                  
                  <FormField>
                    <FormLabel htmlFor="email" required>Email Address</FormLabel>
                    <Input id="email" type="email" placeholder="Enter your email" />
                    <FormError>Please enter a valid email</FormError>
                  </FormField>
                  
                  <Button type="submit" className="mt-4">Submit Form</Button>
                </Form>
              </CardContent>
            </Card>
          </Grid>
        </TabsContent>

        {/* Display Components Tab */}
        <TabsContent value="display">
          <Grid cols={2} gap="lg" className="mb-12">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Cards</h3>
                <p className="text-slate-600">Card components with different content</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card padding="sm" hover>
                  <CardContent>
                    <h4 className="font-semibold">Small Card</h4>
                    <p className="text-sm text-slate-600">This is a small card with hover effect</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h4 className="font-semibold">Regular Card</h4>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">This is a regular card with header and content</p>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm">Action</Button>
                  </CardFooter>
                </Card>

                <Card padding="lg">
                  <CardContent>
                    <h4 className="font-semibold">Large Card</h4>
                    <p className="text-slate-600">This card has larger padding for more spacious content</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Badges</h3>
                <p className="text-slate-600">Status indicators and labels</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Avatars</h3>
                <p className="text-slate-600">User profile pictures</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar size="sm" fallback="JD" />
                  <Avatar size="md" fallback="JS" />
                  <Avatar size="lg" fallback="BJ" />
                  <Avatar size="xl" fallback="AB" />
                </div>
                
                <div className="flex items-center gap-4">
                  <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" alt="User" />
                  <Avatar fallback="UX" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Progress Bars</h3>
                <p className="text-slate-600">Progress indicators</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Progress value={progress} showValue />
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                      -10%
                    </Button>
                    <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                      +10%
                    </Button>
                  </div>
                </div>
                
                <Progress value={75} size="sm" />
                <Progress value={50} size="md" />
                <Progress value={25} size="lg" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Loading States</h3>
                <p className="text-slate-600">Loading indicators and skeletons</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" />
                  <LoadingSpinner size="lg" />
                </div>
                
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full rounded-lg" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Copyable Text</h3>
                <p className="text-slate-600">Text that can be easily copied</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <CopyableText text="npm install @chatconnect/ui" />
                <CopyableText text="https://example.com/very-long-url" showIcon={false} />
                <CopyableText text="API_KEY_123456789" className="w-full" />
              </CardContent>
            </Card>
          </Grid>
        </TabsContent>

        {/* Navigation Tab */}
        <TabsContent value="navigation">
          <Grid cols={2} gap="lg" className="mb-12">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Breadcrumb</h3>
                <p className="text-slate-600">Navigation hierarchy</p>
              </CardHeader>
              <CardContent>
                <Breadcrumb items={breadcrumbItems} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Pagination</h3>
                <p className="text-slate-600">Page navigation</p>
              </CardHeader>
              <CardContent>
                <Pagination
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                />
                <p className="text-sm text-slate-500 mt-2 text-center">
                  Current Page: {currentPage}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Step Indicator</h3>
                <p className="text-slate-600">Multi-step process indicator</p>
              </CardHeader>
              <CardContent>
                <StepIndicator steps={steps} currentStep="2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Dropdown Menu</h3>
                <p className="text-slate-600">Contextual action menus</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dropdown
                  trigger={
                    <Button rightIcon={<ChevronDown className="w-4 h-4" />}>
                      Actions
                    </Button>
                  }
                >
                  <DropdownItem onClick={() => addToast({ title: 'Edit clicked' })}>
                    Edit
                  </DropdownItem>
                  <DropdownItem onClick={() => addToast({ title: 'Duplicate clicked' })}>
                    Duplicate
                  </DropdownItem>
                  <DropdownItem onClick={() => addToast({ title: 'Delete clicked', variant: 'error' })}>
                    Delete
                  </DropdownItem>
                </Dropdown>

                <Dropdown
                  trigger={
                    <Button variant="outline" rightIcon={<ChevronDown className="w-4 h-4" />}>
                      Options
                    </Button>
                  }
                  align="right"
                >
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem>Option 3</DropdownItem>
                </Dropdown>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Tabs</h3>
                <p className="text-slate-600">Organized content sections</p>
              </CardHeader>
              <CardContent>
                <Tabs value="tab1" onValueChange={() => {}}>
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">
                    <p>Content for tab 1</p>
                  </TabsContent>
                  <TabsContent value="tab2">
                    <p>Content for tab 2</p>
                  </TabsContent>
                  <TabsContent value="tab3">
                    <p>Content for tab 3</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Accordion</h3>
                <p className="text-slate-600">Collapsible content sections</p>
              </CardHeader>
              <CardContent>
                <Accordion type="single">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Section 1</AccordionTrigger>
                    <AccordionContent>
                      This is the content for section 1. It can contain any React components.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Section 2</AccordionTrigger>
                    <AccordionContent>
                      This is the content for section 2. Another collapsible section.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <Grid cols={2} gap="lg" className="mb-12">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Alerts</h3>
                <p className="text-slate-600">Status messages and notifications</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="success">
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Your changes have been saved successfully.
                  </AlertDescription>
                </Alert>

                <Alert variant="error">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    There was a problem with your request.
                  </AlertDescription>
                </Alert>

                <Alert variant="warning">
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    This action cannot be undone.
                  </AlertDescription>
                </Alert>

                <Alert variant="info">
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    Here's some important information you should know.
                  </AlertDescription>
                </Alert>

                <Alert variant="info" dismissible onDismiss={() => addToast({ title: 'Alert dismissed' })}>
                  <AlertTitle>Dismissible Alert</AlertTitle>
                  <AlertDescription>
                    This alert can be dismissed by clicking the X button.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Toasts</h3>
                <p className="text-slate-600">Temporary notification messages</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={() => addToast({ 
                      title: 'Success!', 
                      description: 'Operation completed successfully.',
                      variant: 'success'
                    })}
                  >
                    Success Toast
                  </Button>
                  
                  <Button 
                    onClick={() => addToast({ 
                      title: 'Error', 
                      description: 'Something went wrong.',
                      variant: 'error'
                    })}
                  >
                    Error Toast
                  </Button>
                  
                  <Button 
                    onClick={() => addToast({ 
                      title: 'Information', 
                      description: 'Here is some information.',
                      variant: 'info'
                    })}
                  >
                    Info Toast
                  </Button>
                  
                  <Button 
                    onClick={() => addToast({ 
                      title: 'Warning', 
                      description: 'Please be careful.',
                      variant: 'warning'
                    })}
                  >
                    Warning Toast
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Tooltips</h3>
                <p className="text-slate-600">Contextual information on hover</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Tooltip content="This is a tooltip on top" position="top">
                    <Button>Top Tooltip</Button>
                  </Tooltip>
                  
                  <Tooltip content="This is a tooltip on right" position="right">
                    <Button>Right Tooltip</Button>
                  </Tooltip>
                  
                  <Tooltip content="This is a tooltip on bottom" position="bottom">
                    <Button>Bottom Tooltip</Button>
                  </Tooltip>
                  
                  <Tooltip content="This is a tooltip on left" position="left">
                    <Button>Left Tooltip</Button>
                  </Tooltip>
                </div>
                
                <div className="flex items-center gap-2">
                  <Tooltip content="User profile information">
                    <Avatar fallback="JD" />
                  </Tooltip>
                  
                  <Tooltip content="Click to search">
                    <Button variant="ghost" size="sm">
                      <Search className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                  
                  <Tooltip content="Add to favorites">
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Modal</h3>
                <p className="text-slate-600">Dialog windows and overlays</p>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setModalOpen(true)}>
                  Open Modal
                </Button>
                
                <Modal 
                  isOpen={modalOpen} 
                  onClose={() => setModalOpen(false)}
                  title="Demo Modal"
                  size="md"
                >
                  <div className="space-y-4">
                    <p>This is a modal dialog. It can contain any content you want.</p>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => {
                        setModalOpen(false);
                        addToast({ title: 'Action confirmed!' });
                      }}>
                        Confirm
                      </Button>
                    </div>
                  </div>
                </Modal>
              </CardContent>
            </Card>
          </Grid>
        </TabsContent>

        {/* Data Display Tab */}
        <TabsContent value="data">
          <Grid cols={1} gap="lg" className="mb-12">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Table</h3>
                <p className="text-slate-600">Basic table component</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell>
                          <Badge variant={row.status === 'Active' ? 'success' : 'default'}>
                            {row.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Data Grid</h3>
                <p className="text-slate-600">Advanced table with custom rendering</p>
              </CardHeader>
              <CardContent>
                <DataGrid
                  columns={dataGridColumns}
                  data={dataGridData}
                  keyField="id"
                  emptyMessage="No products found"
                />
              </CardContent>
            </Card>
          </Grid>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout">
          <Grid cols={2} gap="lg" className="mb-12">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Grid System</h3>
                <p className="text-slate-600">Responsive grid layouts</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">2 Columns</h4>
                  <Grid cols={2} gap="sm">
                    <div className="bg-blue-100 p-4 rounded text-center">Column 1</div>
                    <div className="bg-blue-100 p-4 rounded text-center">Column 2</div>
                  </Grid>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">3 Columns</h4>
                  <Grid cols={3} gap="md">
                    <div className="bg-green-100 p-4 rounded text-center">1</div>
                    <div className="bg-green-100 p-4 rounded text-center">2</div>
                    <div className="bg-green-100 p-4 rounded text-center">3</div>
                  </Grid>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">4 Columns</h4>
                  <Grid cols={4} gap="lg">
                    <div className="bg-purple-100 p-4 rounded text-center">A</div>
                    <div className="bg-purple-100 p-4 rounded text-center">B</div>
                    <div className="bg-purple-100 p-4 rounded text-center">C</div>
                    <div className="bg-purple-100 p-4 rounded text-center">D</div>
                  </Grid>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Sidebar</h3>
                <p className="text-slate-600">Side navigation panel</p>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg h-64 relative">
                  <Sidebar>
                    <SidebarHeader>
                      <h4 className="font-semibold">Navigation</h4>
                    </SidebarHeader>
                    <SidebarContent className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start" leftIcon={<User className="w-4 h-4" />}>
                        Profile
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" leftIcon={<Settings className="w-4 h-4" />}>
                        Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" leftIcon={<Mail className="w-4 h-4" />}>
                        Messages
                      </Button>
                    </SidebarContent>
                  </Sidebar>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <h3 className="text-2xl font-bold text-slate-900">Container Sizes</h3>
                <p className="text-slate-600">Different container width variants</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Small Container</h4>
                  <Container size="sm" className="bg-slate-100 p-4 rounded">
                    <p>This is a small container with max-width</p>
                  </Container>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Medium Container</h4>
                  <Container size="md" className="bg-slate-100 p-4 rounded">
                    <p>This is a medium container with max-width</p>
                  </Container>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Large Container</h4>
                  <Container size="lg" className="bg-slate-100 p-4 rounded">
                    <p>This is a large container with max-width</p>
                  </Container>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Extra Large Container</h4>
                  <Container size="xl" className="bg-slate-100 p-4 rounded">
                    <p>This is an extra large container with max-width</p>
                  </Container>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </TabsContent>
      </Tabs>
    </Container>
  );
}

export default function DemoPage() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50">
        <DemoContent />
      </div>
    </ToastProvider>
  );
}