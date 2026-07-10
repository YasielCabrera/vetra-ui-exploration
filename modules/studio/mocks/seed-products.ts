import type { Product } from "@/modules/studio/types"

export const SEED_PRODUCTS: Product[] = [
  {
    id: "product-invoice-approval",
    name: "Invoice Approval Workflow",
    description:
      "Route invoices through review, rejection loops, and paid queues with department totals.",
    status: "building",
    updatedAt: "2026-07-10T15:12:00.000Z",
    packageName: "invoice-approval-workflow",
  },
  {
    id: "product-qr-code",
    name: "QR Code Manager",
    description:
      "Organize QR documents, generate codes, and download assets from a dedicated editor.",
    status: "published",
    updatedAt: "2026-07-10T14:37:11.000Z",
    packageName: "qr-code-manager",
  },
  {
    id: "product-expense",
    name: "Expense Reports",
    description:
      "Capture receipts, route approvals, and sync expense reports across your drive.",
    status: "building",
    updatedAt: "2026-07-09T18:14:32.000Z",
    packageName: "expense-reports",
  },
  {
    id: "product-inventory",
    name: "Inventory Tracker",
    description:
      "Track stock levels with barcode scanning and real-time inventory documents.",
    status: "draft",
    updatedAt: "2026-07-08T11:08:10.000Z",
    packageName: "inventory-tracker",
  },
  {
    id: "product-onboarding",
    name: "Team Onboarding",
    description:
      "Onboarding workspace for new hires with checklists and shared drive docs.",
    status: "published",
    updatedAt: "2026-07-07T09:42:18.000Z",
    packageName: "team-onboarding",
  },
  {
    id: "product-governance",
    name: "DAO Governance",
    description:
      "Governance package with proposals, voting, and member management.",
    status: "published",
    updatedAt: "2026-07-06T16:25:44.000Z",
    packageName: "dao-governance",
  },
]
