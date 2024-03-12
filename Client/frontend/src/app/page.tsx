"use client"

import Image from "next/image";
import { useState,useEffect} from "react";
import { getAllIssues,Issue,deleteIssue,getIssueById,updateIssue,createIssue} from "../../services/issueServices";
export default function Home() {

  const [issue, setIssue] = useState<Issue[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [singleIssue, setSingleIssue] = useState<Issue | undefined>(undefined);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');


  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const fetchedIssue = await getAllIssues();
        setIssue(fetchedIssue);
      } catch (error) {
        console.error('Error fetching issue:', error);
      }
    };

    fetchIssue();
  }, [issue]); // Run the effect whenever the id changes



  const handleTitleChange = (event:any) => {
    setEditTitle(event.target.value);
  };

  const handleDescriptionChange = (event:any) => {
    setEditDescription(event.target.value);
  };

  useEffect(() => {
    // When singleIssue changes, update the editTitle and editDescription
    if (singleIssue) {
      setEditTitle(singleIssue.title);
      setEditDescription(singleIssue.description);
    }
  }, [singleIssue]);



  const selectIssue = async (id: number) => {
    const issue = await getIssueById(id);
    if (issue !== null) {
      setSingleIssue(issue);
      openModal(); // Call openModal without any arguments
    } else {
      // Handle the case where no issue is found
      console.error(`No issue found with ID ${id}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };


  const handleDelete = (id: number) => {
    // Implement delete logic here
    console.log(`Deleting issue with ID ${id}`);
    deleteIssue(id)
  };



  const saveChanges = () => {
    // Ensure that there is an issue to update
    if (singleIssue && singleIssue.id) {
      // Construct the issue data object with the edited title and description
      const issueData = {
        title: editTitle,
        description: editDescription
      };
  
      // Call updateIssue with the issue ID and the new issue data
      updateIssue(singleIssue.id, issueData)
        .then(updatedIssue => {
          // Handle the response here, e.g., updating the UI or showing a success message
          console.log('Issue updated successfully', updatedIssue);
          const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
          if (modal) {
            modal.close();
          }
        })
        .catch(error => {
          // Handle any errors here, e.g., showing an error message to the user
          console.error('Error updating issue:', error);
        });
    } else {
      // Handle the case where there is no issue to update, e.g., showing an error message
      console.error('No issue selected for updating');
    }
  };
  


  // Handlers for the new ticket's title and description inputs
const handleNewTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setNewTitle(event.target.value);
};

const handleNewDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setNewDescription(event.target.value);
};




  const openModal = () => {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };


  const openModal2 = () => {
    const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };


  const createIssues = () => {
    // Construct the issue data object with the new title and description
    const newIssueData = {
      title: newTitle, // Assuming editTitle holds the new issue's title
      description: newDescription // Assuming editDescription holds the new issue's description
    };
    
    console.log(newIssueData)
    // Call an API function to create the new issue with the issue data
    createIssue(newIssueData) // Assuming createNewIssue is your API call function
      .then(newIssue => {
        // Handle the response here, e.g., updating the UI or showing a success message
        console.log('Issue created successfully', newIssue);
        const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null; // Assuming 'my_modal_2' is your create modal ID
        if (modal) {
          modal.close(); // Close the modal upon successful issue creation
        }
        // Optionally reset form fields or update UI here
      })
      .catch(error => {
        // Handle any errors here, e.g., showing an error message to the user
        console.error('Error creating new issue:', error);
      });
  };
  




  return (

    <div className="flex flex-col items-center">
<dialog id="my_modal_1" className="modal  p-4 bg-white rounded-lg shadow-lg">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Edit Ticket   {singleIssue?.id}</h3>

          <div className="flex flex-col">
          <label className="my-2">Title</label>
        <input
          type="text"
          value={editTitle}
          onChange={handleTitleChange}
          className="w-64 px-4 py-2 mb-4 border rounded"
        />
        <label className="my-2">Description</label>
        <input
          type="text"
          value={editDescription}
          onChange={handleDescriptionChange}
          className="w-64 px-4 py-2 mb-4 border rounded"
        />
   
          </div>

          <div className="modal-action mt-4">
        <button className="btn" onClick={saveChanges}>Save</button>
      </div>
        </div>
      </dialog>


      <dialog id="my_modal_2" className="modal  p-4 bg-white rounded-lg shadow-lg">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Create Ticket</h3>

          <div className="flex flex-col">
          <label className="my-2">Title</label>
        <input
          type="text"
          value={newTitle} 
          onChange={handleNewTitleChange} 
          className="w-64 px-4 py-2 mb-4 border rounded"
        />
        <label className="my-2">Description</label>
        <input
          type="text"
          value={newDescription} 
          onChange={handleNewDescriptionChange} 
          className="w-64 px-4 py-2 mb-4 border rounded"
        />
   
          </div>

          <div className="modal-action mt-4">
        <button className="btn" onClick={createIssues}>Create</button>
      </div>
        </div>
      </dialog>



    <h1 className="text-3xl font-bold underline mb-4">Select Your Ticket</h1>

    <div className="mb-4">
        <button
            className="px-6 py-2 border rounded text-white bg-green-500 hover:bg-green-700"
        onClick={openModal2}
        >
            Create
        </button>
        </div>
<div className=" mx-auto items-center ">
      <table className="table-fixed border-collapse items-center "> {/* Set fixed width */}
        <thead className="bg-blue-200">
          <tr>
            <th className="w-1/4 py-2">ID</th> {/* Adjust column widths */}
            <th className="w-1/4 py-2">Title</th>
            <th className="w-1/4 py-2">Description</th>
            <th className="w-1/4 py-2">Actions</th> {/* Adjust column widths */}
          </tr>
        </thead>
        <tbody className="item-center">
          {issue.map((issue) => (
            <tr key={issue.id}>
              <td className="border px-4 py-2">{issue.id}</td>
              <td className="border px-4 py-2">{issue.title}</td>
              <td className="border px-4 py-2">{issue.description}</td>
              <td className="border px-4 py-2 ">
                {/* Edit button */}
                <button
                  className="text-blue-600 hover:text-blue-900 mx-5"
                  onClick={() => selectIssue(issue.id)}
                >
                  Edit
                </button>
                {/* Delete button */}
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDelete(issue.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
   
  );
}
