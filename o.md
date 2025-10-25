Use this prompt to convert any React component to use our custom UI component library:

text
Convert the following React component to use our custom UI component library. Replace standard HTML elements and basic components with our library components where appropriate.

## AVAILABLE UI COMPONENTS:

### Layout Components
- `<Container size="sm|md|lg|xl|full">` - Responsive container
- `<Grid cols={1|2|3|4|5|6|12} gap="none|sm|md|lg|xl">` - Grid system
- `<Sidebar>`, `<SidebarHeader>`, `<SidebarContent>` - Side navigation

### Basic UI Components
- `<Button variant="primary|secondary|outline|ghost|danger" size="sm|md|lg|xl">` - All button variants
- `<Input label="..." error="..." leftIcon={<Icon/>} rightIcon={<Icon/>}>` - Enhanced input
- `<Card padding="none|sm|md|lg" hover>`, `<CardHeader>`, `<CardContent>`, `<CardFooter>` - Card containers
- `<Alert variant="success|error|warning|info" dismissible>` - Status alerts
- `<Badge variant="default|primary|success|warning|error|outline" size="sm|md">` - Status badges
- `<Avatar src="..." fallback="..." size="sm|md|lg|xl">` - User avatars

### Interactive Components
- `<Modal isOpen onClose title="..." size="sm|md|lg|xl">` - Dialog modals
- `<Tabs value onValueChange>`, `<TabsList>`, `<TabsTrigger>`, `<TabsContent>` - Tab navigation
- `<Accordion type="single|multiple">`, `<AccordionItem>`, `<AccordionTrigger>`, `<AccordionContent>` - Collapsible sections
- `<Dropdown trigger={<Button>}>`, `<DropdownItem>` - Context menus
- `<Toggle checked onCheckedChange size="sm|md|lg">` - Switch toggles
- `<Select value onValueChange>`, `<SelectItem>` - Custom select

### Feedback Components
- `<ToastProvider>`, `useToast()` - Notification system
- `<Tooltip content="..." position="top|bottom|left|right">` - Hover tooltips
- `<LoadingSpinner size="sm|md|lg">` - Loading indicator
- `<Progress value={0-100} showValue size="sm|md|lg">` - Progress bars
- `<Skeleton>` - Loading placeholder

### Data Display
- `<Table>`, `<TableHeader>`, `<TableBody>`, `<TableRow>`, `<TableHead>`, `<TableCell>` - Basic tables
- `<DataGrid columns={[...]} data={[...]} keyField="id">` - Advanced data grid
- `<CopyableText text="..." showIcon>` - Copy-to-clipboard text

### Navigation
- `<Breadcrumb items={[{label, href}]}>` - Breadcrumb navigation
- `<Pagination currentPage totalPages onPageChange>` - Page navigation
- `<StepIndicator steps={[{id, label, description}]} currentStep>` - Multi-step progress

### Form Components
- `<Form onSubmit>`, `<FormField>`, `<FormLabel>`, `<FormDescription>`, `<FormError>` - Form structure
- `<ImageUpload value onChange>` - Image upload with preview

## CONVERSION RULES:

1. **Replace standard elements:**
   - `<button>` → `<Button>`
   - `<input>` → `<Input>`
   - `<div className="card">` → `<Card>`
   - `<div className="container">` → `<Container>`
   - `<div className="grid">` → `<Grid>`

2. **Add proper variants and sizes:**
   - Primary buttons: `variant="primary"`
   - Secondary buttons: `variant="secondary"`
   - Outline buttons: `variant="outline"`
   - Small elements: `size="sm"`
   - Large elements: `size="lg"`

3. **Use proper structure:**
   - Cards should use `<CardHeader>`, `<CardContent>`, `<CardFooter>`
   - Forms should use `<Form>`, `<FormField>`, etc.
   - Tables should use our table components

4. **Add loading states:**
   - Use `<LoadingSpinner>` for loading indicators
   - Use `<Skeleton>` for content placeholders

5. **Add proper feedback:**
   - Use `<Alert>` for status messages
   - Use `useToast()` for notifications
   - Use `<Tooltip>` for hover information

6. **Implement proper state management:**
   - Use our `<Toggle>` for switches
   - Use our `<Select>` for dropdowns
   - Use our `<Modal>` for dialogs

7. **Ensure responsive design:**
   - Use `<Container>` with appropriate sizes
   - Use `<Grid>` for responsive layouts

## IMPORT PATTERN:
```typescript
import { 
  Button, Input, Card, Alert, Badge, 
  Container, Grid, Modal, Tabs, 
  // ... other needed components
} from '@/components/ui';
import { useToast } from '@/components/ui/Toast';
EXAMPLE CONVERSIONS:
Before:
tsx
<div className="bg-white p-6 rounded-lg shadow">
  <h2 className="text-xl font-bold mb-4">Title</h2>
  <button className="bg-blue-500 text-white px-4 py-2 rounded">
    Click me
  </button>
</div>
After:
tsx
<Card padding="lg">
  <CardHeader>
    <h2 className="text-xl font-bold">Title</h2>
  </CardHeader>
  <CardContent>
    <Button variant="primary">Click me</Button>
  </CardContent>
</Card>
Before:
tsx
<div className="max-w-4xl mx-auto px-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* content */}
  </div>
</div>
After:
tsx
<Container size="lg">
  <Grid cols={2} gap="md">
    {/* content */}
  </Grid>
</Container>
CONVERSION TASK:
Please convert the following component to use our UI library components:

[PASTE COMPONENT CODE HERE]

Apply the conversion rules and ensure:

Proper imports from '@/components/ui'

Consistent styling with our design system

Responsive design patterns

Proper component composition

TypeScript compatibility

text

## Quick Reference Card for Conversions:
┌─────────────────┬─────────────────────────────────┐
│ HTML/React │ Our Library │
├─────────────────┼─────────────────────────────────┤
│ <button> │ <Button variant="primary"> │
│ <input> │ <Input label="..."> │
│ <div class="p-4">│ <Card padding="md"> │
│ <div class="mx-auto">│ <Container> │
│ <div class="grid">│ <Grid cols={3}> │
│ <select> │ <Select> │
│ <img> avatar │ <Avatar> │
│ status text │ <Badge> │
│ loading spinner │ <LoadingSpinner> │
│ modal │ <Modal> │
│ tabs │ <Tabs> │
│ alert message │ <Alert> │
│ progress bar │ <Progress> │
│ tooltip │ <Tooltip> │
│ skeleton │ <Skeleton> │
└─────────────────┴─────────────────────────────────┘

text
