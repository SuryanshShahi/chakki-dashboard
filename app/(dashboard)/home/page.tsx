import PageWrapper from "@/app/components/pageWrapper/PageWrapper";
import Home from "@/app/features/home";

const Page = () => {
  return (
    <PageWrapper hideFooter wrapperClass="!px-0">
      <Home />
    </PageWrapper>
  );
};

export default Page;
