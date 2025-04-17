
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

const Products = () => {
  const { t } = useLanguage();

  const products = [
    {
      id: 1,
      name: "Product One",
      description: "High-quality premium product",
      price: "$99.99",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Product Two",
      description: "Professional grade solution",
      price: "$149.99",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Product Three",
      description: "Enterprise level features",
      price: "$199.99",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('products')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('productsDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="border border-border">
              <CardHeader>
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">{product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;

