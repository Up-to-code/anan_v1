/* eslint-disable @typescript-eslint/no-explicit-any */
// app/components/page.tsx
'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  Settings,
  User,
  Bell,
  Home,
  Mail,
  Calendar,
  FileText,
  BarChart3,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  X,
  Menu,
  ChevronDown,
  ChevronRight,
  Star,
  Heart,
  Share,
  Eye,
  Clock,
  MapPin,
  Phone,
  Globe,
  Lock,
  Unlock,
  CreditCard,
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  Copy,
  ArrowLeft,
  LogOut,
  MoreHorizontal,
  Image as ImageIcon,
  Users
} from 'lucide-react';

// Import all components with correct case
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { CopyableText } from '@/components/ui/CopyableText';
import { Badge } from '@/components/ui/Badge';
import { Dropdown } from '@/components/ui/Dropdown';
import { Modal } from '@/components/ui/Modal';
import { Tabs } from '@/components/ui/Tabs';
import { Accordion } from '@/components/ui/Accordion';
import { Pagination } from '@/components/ui/Pagination';
import { Progress } from '@/components/ui/Progress';
import { Toggle } from '@/components/ui/Toggle';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Avatar } from '@/components/ui/Avatar';
import { Tooltip } from '@/components/ui/Tooltip';
import { Skeleton } from '@/components/ui/Skeleton';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Table } from '@/components/ui/Table';
import { DataGrid } from '@/components/ui/DataGrid';
import { Form } from '@/components/ui/Form';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Sidebar } from '@/components/layout/Sidebar';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { ToastProvider, useToast } from '@/components/ui/Toast';

// Toast Demo Component
function ToastDemo() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        onClick={() => addToast({
          title: 'Success!',
          message: 'Your action was completed successfully.',
          type: 'success'
        })}
      >
        Show Success Toast
      </Button>
      <Button 
        variant="secondary"
        onClick={() => addToast({
          title: 'Error',
          message: 'Something went wrong. Please try again.',
          type: 'error'
        })}
      >
        Show Error Toast
      </Button>
      <Button 
        variant="secondary"
        onClick={() => addToast({
          title: 'Information',
          message: 'Here is some important information.',
          type: 'info'
        })}
      >
        Show Info Toast
      </Button>
    </div>
  );
}

// PageHeader Component
function PageHeader({ title, description, backLink, backText }: any) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {backLink && (
          <a href={backLink} className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft size={20} className="mr-2" />
            {backText}
          </a>
        )}
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>
    </header>
  );
}

function ComponentsPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('buttons');
  const [progress, setProgress] = useState(65);
  const [isToggled, setIsToggled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { addToast } = useToast();

  const steps = [
    {
      number: 1,
      title: "Account Setup",
      description: "Create your account",
      icon: User,
      status: 'completed' as const
    },
    {
      number: 2,
      title: "Profile Information", 
      description: "Add your details",
      icon: User,
      status: 'current' as const
    },
    {
      number: 3,
      title: "Verification",
      description: "Verify your identity",
      icon: CheckCircle,
      status: 'upcoming' as const
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'UI Elements', href: '#' }
  ];

  const accordionItems = [
    {
      title: 'How do I get started?',
      content: 'Getting started is easy! Just follow our step-by-step guide to set up your account and explore all the features.'
    },
    {
      title: 'What payment methods do you accept?',
      content: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.'
    },
    {
      title: 'Can I cancel my subscription?',
      content: 'Yes, you can cancel your subscription at any time from your account settings. You will continue to have access until the end of your billing period.'
    }
  ];

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, current: true },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Users', href: '/users', icon: Users, badge: '3' },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Messages', href: '/messages', icon: Mail, badge: '12' },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4', disabled: true },
    { value: 'option5', label: 'Option 5' },
  ];

  const tableColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status', sortable: true },
    { 
      key: 'lastLogin', 
      label: 'Last Login',
      render: (value: string) => new Date(value).toLocaleDateString()
    },
  ];

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2024-01-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-16' },
  ];

  const tableActions = [
    { label: 'Edit', icon: Edit, onClick: (row: any) => addToast({ title: 'Edit', message: `Editing ${row.name}`, type: 'info' }) },
    { label: 'Delete', icon: Trash2, onClick: (row: any) => addToast({ title: 'Delete', message: `Deleting ${row.name}`, type: 'error' }), variant: 'danger' as const },
  ];

  const tabs = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'forms', label: 'Forms' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'data', label: 'Data Display' },
    { id: 'advanced', label: 'Advanced' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="UI Components" 
        description="A complete collection of reusable UI components for your application"
        backLink="/"
        backText="Back to Dashboard"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Buttons Section */}
        {activeTab === 'buttons' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Buttons</h2>
            
            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small Button</Button>
                <Button size="md">Medium Button</Button>
                <Button size="lg">Large Button</Button>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Button States</h3>
              <div className="flex flex-wrap gap-4">
                <Button loading>Loading State</Button>
                <Button disabled>Disabled State</Button>
                <Button icon={Plus}>With Left Icon</Button>
                <Button icon={Download} iconPosition="right">With Right Icon</Button>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Button Group</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" icon={Edit}>Edit</Button>
                <Button variant="secondary" icon={Download}>Download</Button>
                <Button variant="secondary" icon={Share}>Share</Button>
                <Button variant="danger" icon={Trash2}>Delete</Button>
              </div>
            </Card>
          </div>
        )}

        {/* Forms Section */}
        {activeTab === 'forms' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Form Elements</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card padding="lg">
                <h3 className="text-lg font-semibold mb-4">Input Fields</h3>
                <div className="space-y-4">
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Enter your email"
                    helperText="We'll never share your email."
                  />
                  
                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter your password"
                  />
                  
                  <Input
                    label="Search"
                    type="search"
                    value={search}
                    onChange={setSearch}
                    placeholder="Search..."
                    onClear={() => setSearch('')}
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    value=""
                    onChange={() => {}}
                    placeholder="+1 (555) 000-0000"
                    error="Please enter a valid phone number"
                  />
                </div>
              </Card>

              <Card padding="lg">
                <h3 className="text-lg font-semibold mb-4">Form Controls</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Enable notifications</span>
                    <Toggle enabled={isToggled} onChange={setIsToggled} />
                  </div>

                  <Select
                    label="Select Option"
                    value={selectedOption}
                    onChange={setSelectedOption}
                    options={selectOptions}
                    placeholder="Choose an option"
                    helperText="This is a select dropdown"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Progress
                    </label>
                    <Progress value={progress} />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>{progress}%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Copyable Text
                    </label>
                    <CopyableText
                      text="https://example.com/very-long-url-that-needs-to-be-copied"
                      helperText="Click to copy to clipboard"
                    />
                  </div>
                </div>
              </Card>
            </div>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Dropdown Example</h3>
              <Dropdown
                trigger={
                  <Button variant="secondary" icon={ChevronDown}>
                    Select Option
                  </Button>
                }
                items={[
                  { label: 'Edit', icon: Edit, onClick: () => {} },
                  { label: 'Duplicate', icon: Copy, onClick: () => {} },
                  { label: '', onClick: () => {}, type: 'separator' },
                  { label: 'Delete', icon: Trash2, onClick: () => {}, variant: 'danger' }
                ]}
              />
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Image Upload</h3>
              <ImageUpload
                value={imageFile ? URL.createObjectURL(imageFile) : undefined}
                onChange={setImageFile}
                label="Profile Picture"
                helperText="Upload a profile picture (JPG, PNG, GIF)"
              />
            </Card>
          </div>
        )}

        {/* Feedback Section */}
        {activeTab === 'feedback' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Feedback & Alerts</h2>
            
            <div className="space-y-4">
              <Alert type="info" title="Information">
                This is an informational message about recent changes to our platform.
              </Alert>
              
              <Alert type="success" title="Success!" icon={CheckCircle}>
                Your action has been completed successfully. All changes have been saved.
              </Alert>
              
              <Alert type="warning" title="Warning" dismissible>
                Please check your input and try again. Some fields require attention.
              </Alert>
              
              <Alert type="error" title="Error">
                There was a problem processing your request. Please try again later.
              </Alert>
            </div>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="default">+3 More</Badge>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Modal</h3>
              <Button onClick={() => setIsModalOpen(true)}>
                Open Modal
              </Button>
              
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Example Modal"
                size="md"
              >
                <div className="space-y-4">
                  <p className="text-gray-600">
                    This is an example modal content. You can put any content here including forms, images, or additional information.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsModalOpen(false)}>
                      Confirm Action
                    </Button>
                  </div>
                </div>
              </Modal>
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Loading States</h3>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <LoadingSpinner size="sm" />
                  <p className="text-sm text-gray-600 mt-2">Small</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" />
                  <p className="text-sm text-gray-600 mt-2">Medium</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="text-sm text-gray-600 mt-2">Large</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation Section */}
        {activeTab === 'navigation' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Navigation</h2>
            
            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Breadcrumb</h3>
              <Breadcrumb items={breadcrumbItems} />
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Step Indicator</h3>
              <StepIndicator steps={steps} title="Onboarding Process" />
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Pagination</h3>
              <Pagination
                currentPage={3}
                totalPages={10}
                onPageChange={(page) => console.log('Page changed to:', page)}
              />
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Tabs</h3>
              <Tabs
                tabs={[
                  { id: 'profile', label: 'Profile' },
                  { id: 'settings', label: 'Settings' },
                  { id: 'billing', label: 'Billing' },
                  { id: 'notifications', label: 'Notifications' }
                ]}
                activeTab="profile"
                onTabChange={(tab) => console.log('Tab changed to:', tab)}
              />
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Sidebar Navigation</h3>
              <div className="border rounded-lg overflow-hidden">
                <Sidebar
                  items={sidebarItems}
                  user={{
                    name: "John Doe",
                    email: "john@example.com"
                  }}
                  onNavigate={(href) => addToast({ title: 'Navigation', message: `Navigating to ${href}`, type: 'info' })}
                  onLogout={() => addToast({ title: 'Logout', message: 'Logging out...', type: 'info' })}
                />
              </div>
            </Card>
          </div>
        )}

        {/* Data Display Section */}
        {activeTab === 'data' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Display</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card padding="lg">
                <h3 className="text-lg font-semibold mb-4">User Card</h3>
                <div className="flex items-center space-x-4">
                  <Avatar
                    src=""
                    alt="John Doe"
                    fallback="JD"
                    size="lg"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">John Doe</h4>
                    <p className="text-sm text-gray-500">john.doe@example.com</p>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="success">Active</Badge>
                      <Badge variant="info">Pro</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card padding="lg">
                <h3 className="text-lg font-semibold mb-4">Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monthly Revenue</span>
                    <Badge variant="success">+12%</Badge>
                  </div>
                  <Progress value={75} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">User Growth</span>
                    <Badge variant="success">+8%</Badge>
                  </div>
                  <Progress value={60} />
                </div>
              </Card>
            </div>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Accordion</h3>
              <Accordion items={accordionItems} />
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Tooltip</h3>
              <div className="flex gap-4">
                <Tooltip content="This is a tooltip on top">
                  <Button variant="secondary">Hover me (Top)</Button>
                </Tooltip>
                
                <Tooltip content="This is a tooltip on bottom" position="bottom">
                  <Button variant="secondary" icon={HelpCircle}>
                    Help (Bottom)
                  </Button>
                </Tooltip>

                <Tooltip content="Tooltip on left side" position="left">
                  <Button variant="secondary">Left Tooltip</Button>
                </Tooltip>

                <Tooltip content="Tooltip on right side" position="right">
                  <Button variant="secondary">Right Tooltip</Button>
                </Tooltip>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Skeleton Loaders</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <div className="flex space-x-3 mt-4">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Copyable Text Examples</h3>
              <div className="space-y-4">
                <CopyableText
                  text="https://api.example.com/webhooks/12345"
                  label="Webhook URL"
                  helperText="Copy this URL to configure your webhook"
                  showExternalLink
                />
                
                <CopyableText
                  text="sk_live_1234567890abcdef"
                  label="API Key"
                  helperText="Keep this secret and secure"
                  variant="inline"
                />
              </div>
            </Card>
          </div>
        )}

        {/* Advanced Section */}
        {activeTab === 'advanced' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Components</h2>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Data Table</h3>
              <Table
                columns={tableColumns}
                data={tableData}
                actions={tableActions}
                onRowClick={(row) => addToast({ title: 'Row Click', message: `Clicked on ${row.name}`, type: 'info' })}
                onSort={(key, direction) => addToast({ title: 'Sort', message: `Sorting by ${key} ${direction}`, type: 'info' })}
              />
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Data Grid</h3>
              <DataGrid
                title="Users"
                columns={tableColumns}
                data={tableData}
                onAdd={() => addToast({ title: 'Add', message: 'Adding new user', type: 'success' })}
                onExport={() => addToast({ title: 'Export', message: 'Exporting data', type: 'info' })}
                onSearch={(query) => addToast({ title: 'Search', message: `Searching for: ${query}`, type: 'info' })}
                addButtonLabel="Add User"
              />
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Form with Validation</h3>
              <Form onSubmit={(formData) => {
                const data = Object.fromEntries(formData);
                addToast({ 
                  title: 'Form Submitted', 
                  message: `Data: ${JSON.stringify(data)}`, 
                  type: 'success' 
                });
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Field label="First Name" required>
                    <Input
                      name="firstName"
                      value=""
                      onChange={() => {}}
                      placeholder="Enter first name"
                    />
                  </Form.Field>
                  <Form.Field label="Last Name" required>
                    <Input
                      name="lastName"
                      value=""
                      onChange={() => {}}
                      placeholder="Enter last name"
                    />
                  </Form.Field>
                  <Form.Field label="Email" required helperText="We'll never share your email.">
                    <Input
                      name="email"
                      type="email"
                      value=""
                      onChange={() => {}}
                      placeholder="Enter email"
                    />
                  </Form.Field>
                  <Form.Field label="Role">
                    <Select
                      name="role"
                      value=""
                      onChange={() => {}}
                      options={[
                        { value: 'user', label: 'User' },
                        { value: 'admin', label: 'Admin' },
                        { value: 'editor', label: 'Editor' }
                      ]}
                      placeholder="Select role"
                    />
                  </Form.Field>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Toast Notifications</h3>
              <ToastDemo />
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold mb-4">Layout Components</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Container Sizes</h4>
                  <div className="space-y-2">
                    <Container maxWidth="sm" className="bg-blue-100 p-4 rounded border">
                      <p className="text-center">Small Container (max-w-sm)</p>
                    </Container>
                    <Container maxWidth="md" className="bg-green-100 p-4 rounded border">
                      <p className="text-center">Medium Container (max-w-md)</p>
                    </Container>
                    <Container maxWidth="lg" className="bg-yellow-100 p-4 rounded border">
                      <p className="text-center">Large Container (max-w-lg)</p>
                    </Container>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Grid System</h4>
                  <Grid cols={3} gap="md">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <Card key={num} padding="sm" className="text-center">
                        <p>Grid Item {num}</p>
                      </Card>
                    ))}
                  </Grid>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <ToastProvider>
      <ComponentsPageContent />
    </ToastProvider>
  );
}