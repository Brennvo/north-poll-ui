import React, { useState, ChangeEvent } from "react";
import { useGroup } from "../GroupProvider/GroupProvider";

// type SuggestionInputsProps = {
//   handleInputChange: Function;
//   values: {
//     title: string;
//     description: string;
//     link: string;
//     price: number;
//   };
// };

// const SuggestionInputs: React.FC<SuggestionInputsProps> = ({
//   handleInputChange,
//   values,
// }) => {
//   return (
//     <form style={{ display: "flex", flexDirection: "column" }}>
//       <div>
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           id="title"
//           onChange={handleInputChange}
//           value={values["title"]}
//         />
//       </div>
//       <div>
//         <label htmlFor="description">Description</label>
//         <input
//           type="text"
//           id="description"
//           onChange={handleInputChange}
//           value={values["description"]}
//         />
//       </div>
//       <div>
//         <label htmlFor="price">Price</label>
//         <input
//           type="number"
//           id="price"
//           onChange={handleInputChange}
//           value={values["price"]}
//         />
//       </div>
//       =
//       <div>
//         <label htmlFor="link">Link</label>
//         <input
//           type="text"
//           id="link"
//           onChange={handleInputChange}
//           value={values["link"]}
//         />
//       </div>
//     </form>
//   );
// };

// const SuggestionForm = () => {
//   const [newSuggestion, setNewSuggestion] = useState({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewSuggestion((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <SuggestionInputs handleInputChange={handleChange} values={newSuggestion} />
//   );
// };

const SelectedPoll: React.FC = () => {
  const { selectedGroup: group } = useGroup();

  return (
    <div>
      <h3>{group!.selectedPoll?.user.username}'s Poll</h3>
      {group?.selectedPoll?.suggestions && (
        <ul>
          {group.selectedPoll.suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <h4>{suggestion.title}</h4>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectedPoll;
