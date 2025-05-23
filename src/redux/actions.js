
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Action types
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const FETCH_COSTS = 'FETCH_COSTS';
export const ADD_COST = 'ADD_COST';
export const DELETE_COST = 'DELETE_COST';

// Fetch items from Firebase
export const fetchItems = () => async (dispatch) => {
  try {
    const snapshot = await getDocs(collection(db, 'items'));
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch({ type: FETCH_ITEMS, payload: items });
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

// Add item to Firebase
export const addItem = (item) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, 'items'), item);
    dispatch({ type: ADD_ITEM, payload: { id: docRef.id, ...item } });
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

// Delete item from Firebase
export const deleteItem = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, 'items', id));
    dispatch({ type: DELETE_ITEM, payload: id });
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

// Fetch other costs from Firebase
export const fetchCosts = () => async (dispatch) => {
  try {
    const snapshot = await getDocs(collection(db, 'otherCosts'));
    const costs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch({ type: FETCH_COSTS, payload: costs });
  } catch (error) {
    console.error('Error fetching costs:', error);
  }
};

// Add other cost to Firebase
export const addCost = (cost) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, 'otherCosts'), cost);
    dispatch({ type: ADD_COST, payload: { id: docRef.id, ...cost } });
  } catch (error) {
    console.error('Error adding cost:', error);
  }
};

// Delete other cost from Firebase
export const deleteCost = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, 'otherCosts', id));
    dispatch({ type: DELETE_COST, payload: id });
  } catch (error) {
    console.error('Error deleting cost:', error);
  }
};
