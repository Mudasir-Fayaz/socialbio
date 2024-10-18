import BioGenerator from "@/components/bio-generator";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (<>
   <Header />
   <div className="min-h-screen transition-colors duration-200">
  <BioGenerator /> 
  </div>
    <Toaster />
      <Footer />
    
  </>
  
  );
}
