"use client";

import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig/page"; 
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import EmojiPicker from "emoji-picker-react"; 
interface Note {
  id: string;
  text: string;
  createdAt: any;
}

const Home = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!note.trim()) return;

    try {
      if (editId) {
        const noteRef = doc(db, "notes", editId);
        await updateDoc(noteRef, { text: note });
        setEditId(null);
      } else {
        await addDoc(collection(db, "notes"), {
          text: note,
          createdAt: new Date(),
        });
      }
      setNote("");
    } catch (error) {
      console.error("Error saving note: ", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  const handleEdit = (note: Note) => {
    setNote(note.text);
    setEditId(note.id);
  };

  const handleStickerClick = () => {
    setShowPicker(!showPicker); 
  };

  const handleEmojiClick = (event: any, emojiObject: any) => {
    setNote(note + emojiObject.emoji); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
          My Lovely Diary 📖
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your secret here..."
            className="flex-1 p-4 rounded-2xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md"
          />

        
          <button
            onClick={handleStickerClick}
            className="bg-gray-300 text-black hover:bg-gray-400 rounded-full p-3 flex items-center justify-center transition-all"
          >
            <span role="img" aria-label="sticker" className="text-xl">
              📎
            </span>
          </button>

     
          <button
            onClick={handleSubmit}
            className={`${
              editId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-purple-600 hover:bg-purple-700"
            } text-white font-semibold px-6 py-3 rounded-2xl transition-all shadow-md`}
          >
            {editId ? "Update" : "Save"}
          </button>
        </div>

      
        {showPicker && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

       
        <div className="grid gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-purple-100 relative group"
            >
              <p className="text-gray-700 text-lg">{note.text}</p>
              <p className="text-xs text-gray-400 text-right mt-2">
                {note.createdAt?.toDate?.().toLocaleString()}
              </p>

              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
