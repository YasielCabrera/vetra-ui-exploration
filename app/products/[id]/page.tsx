import { ProductDetailView } from "@/modules/studio/components/product-detail-view"

type ProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  return <ProductDetailView productId={id} />
}
