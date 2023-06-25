import dynamic from "next/dynamic";
import Seo from "../components/common/Seo";

const index = () => {
  return (
    <>
      <Seo pageTitle="Job List V4" />
      {/* <JobListV4 /> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
