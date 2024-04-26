import create from 'zustand';

interface AppCharacter {
  species: string[];
  gender: string;
  age: number;
  occupation: string;
  birthplace: string;
  status: string;
  name: string;
  img: string;
  setSpecies: (newSpecies: string[]) => void;
  setGender: (newGender: string) => void;
  setAge: (newAge: number) => void;
  setOccupation: (newOccupation: string) => void;
  setBirthplace: (newBirthplace: string) => void;
  setStatus: (newStatus: string) => void;
  setName: (newName: string) => void;
  setImg: (newImg: string) => void;
}

const characterStore = create<AppCharacter>((set) => ({
  species: [],
  gender: '',
  age: 0,
  occupation: '',
  birthplace: '',
  status: '',
  name: '',
  img: '',
  setSpecies: (newSpecies: string[]) => set({ species: newSpecies }),
  setGender: (newGender: string) => set({ gender: newGender }),
  setAge: (newAge: number) => set({ age: newAge }),
  setOccupation: (newOccupation: string) => set({ occupation: newOccupation }),
  setBirthplace: (newBirthplace: string) => set({ birthplace: newBirthplace }),
  setStatus: (newStatus: string) => set({ status: newStatus }),
  setName: (newName: string) => set({name: newName}),
  setImg: (newImg: string) => set({img: newImg}),
}));

export default characterStore;
