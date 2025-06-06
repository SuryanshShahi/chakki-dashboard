import PageWrapper from "@/app/components/pageWrapper/PageWrapper";
import Products from "@/app/features/products";

const Page = () => {
  return (
    <PageWrapper hideFooter wrapperClass="!px-0">
      <Products />
    </PageWrapper>
  );
};

export default Page;
