import ResultCard from "@/components/ResultCard";
import layoutStlyes from "@/styles/Layout.module.css";

/**
 * @typedef {import("@prismicio/client").Content.ResultsSlice} ResultsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ResultsSlice>} ResultsProps
 * @param {ResultsProps}
 */
const Results = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={`${layoutStlyes.sectionContainer} ${layoutStlyes.flexContainer} ${layoutStlyes.flexCenter}`}>
        {
          slice.primary.result.map((item, index) => (
            <ResultCard key={index} item={item} index={index} />
          ))
        }
      </div>

    </section>
  );
};

export default Results;
