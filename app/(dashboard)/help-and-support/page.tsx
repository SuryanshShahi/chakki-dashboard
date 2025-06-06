import PageWrapper from "@/app/components/pageWrapper/PageWrapper";
import HelpAndSupport from "@/app/features/help&Support";

const Page = () => {
  return (
    <PageWrapper
      hideFooter
      wrapperClass="!px-0"
      breadCrumbs={[{ label: "Help & Support" }]}
    >
      <HelpAndSupport />
    </PageWrapper>
  );
};

export default Page;
