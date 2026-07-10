import type { Product, ProductIdeation } from "@/modules/studio/types"

export function buildDefaultIdeation(product: Product): ProductIdeation {
  return {
    sheets: [
      {
        kind: "brand",
        title: "Brand Sheet",
        description: `${product.name} - Brand Sheet`,
      },
      {
        kind: "problem",
        title: "Problem Sheet",
        description: `${product.name} - Problem Sheet`,
      },
      {
        kind: "audience",
        title: "Audience Sheet",
        description: `${product.name} - Audience Sheet`,
      },
    ],
    features: [],
  }
}

export const SEED_IDEATION: Record<string, ProductIdeation> = {
  "product-invoice-approval": {
    sheets: [
      {
        kind: "brand",
        title: "Brand Sheet",
        description: "Invoice Approval Workflow - Brand Sheet",
      },
      {
        kind: "problem",
        title: "Problem Sheet",
        description: "Invoice Approval Workflow - Problem Sheet",
      },
      {
        kind: "audience",
        title: "Audience Sheet",
        description: "Invoice Approval Workflow - Audience Sheet",
      },
    ],
    features: [
      {
        id: "feat-invoice-review",
        title: "Invoice Review & Decision",
        status: "PROPOSED",
        scope: "MICRO_MVP",
        wbs: null,
      },
      {
        id: "feat-rejection-loop",
        title: "Rejection & Resubmission Loop",
        status: "PROPOSED",
        scope: "MICRO_MVP",
        wbs: null,
      },
      {
        id: "feat-invoice-submission",
        title: "Invoice Submission",
        status: "PROPOSED",
        scope: "MICRO_MVP",
        wbs: null,
      },
      {
        id: "feat-paid-queue",
        title: "Paid Queue & Department Totals",
        status: "PROPOSED",
        scope: "MICRO_MVP",
        wbs: null,
      },
    ],
  },
  "product-qr-code": {
    sheets: [
      {
        kind: "brand",
        title: "Brand Sheet",
        description: "QR Code Manager - Brand Sheet",
      },
      {
        kind: "problem",
        title: "Problem Sheet",
        description: "QR Code Manager - Problem Sheet",
      },
      {
        kind: "audience",
        title: "Audience Sheet",
        description: "QR Code Manager - Audience Sheet",
      },
    ],
    features: [
      {
        id: "feat-qr-documents",
        title: "QR Document Model",
        status: "PROPOSED",
        scope: "MICRO_MVP",
        wbs: null,
      },
      {
        id: "feat-qr-editor",
        title: "Document Editor",
        status: "PROPOSED",
        scope: "MICRO_MVP",
        wbs: null,
      },
      {
        id: "feat-qr-download",
        title: "Download Generated Codes",
        status: "PROPOSED",
        scope: "MICRO_MVP",
        wbs: null,
      },
    ],
  },
  "product-expense": {
    sheets: [
      {
        kind: "brand",
        title: "Brand Sheet",
        description: "Expense Reports - Brand Sheet",
      },
      {
        kind: "problem",
        title: "Problem Sheet",
        description: "Expense Reports - Problem Sheet",
      },
      {
        kind: "audience",
        title: "Audience Sheet",
        description: "Expense Reports - Audience Sheet",
      },
    ],
    features: [
      {
        id: "feat-receipt-capture",
        title: "Receipt Capture",
        status: "PROPOSED",
        scope: "MICRO_MVP",
        wbs: null,
      },
      {
        id: "feat-approval-routing",
        title: "Approval Routing",
        status: "PROPOSED",
        scope: "MICRO_MVP",
        wbs: null,
      },
      {
        id: "feat-drive-sync",
        title: "Drive Sync",
        status: "PROPOSED",
        scope: "MICRO_MVP",
        wbs: null,
      },
    ],
  },
}

export function getProductIdeation(product: Product): ProductIdeation {
  return SEED_IDEATION[product.id] ?? buildDefaultIdeation(product)
}
