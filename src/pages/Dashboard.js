import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  HStack,
  useToast,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItem,
  deleteItem,
  fetchItems,
  addCost,
  deleteCost,
  fetchCosts,
} from '../redux/actions';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [itemName, setItemName] = useState('');
  const [itemCost, setItemCost] = useState('');
  const [costDesc, setCostDesc] = useState('');
  const [costAmount, setCostAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Defensive default to empty arrays
  const itemsFromState = useSelector((state) => state.items);
  const otherCostsFromState = useSelector((state) => state.otherCosts);

  // Make sure these are arrays
  const items = Array.isArray(itemsFromState) ? itemsFromState : [];
  const otherCosts = Array.isArray(otherCostsFromState) ? otherCostsFromState : [];

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(fetchItems());
      dispatch(fetchCosts());
    }
  }, [dispatch, navigate, user]);

  const handleAddItem = () => {
    const trimmedName = itemName.trim();
    const costNum = parseFloat(itemCost);

    if (!trimmedName || isNaN(costNum) || costNum <= 0) {
      toast({
        title: 'Please enter a valid item name and positive cost.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    dispatch(addItem({ name: trimmedName, cost: costNum }))
      .then(() => {
        setItemName('');
        setItemCost('');
      })
      .catch((error) => {
        toast({
          title: 'Failed to add item',
          description: error.message || 'An error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleAddCost = () => {
    const trimmedDesc = costDesc.trim();
    const amountNum = parseFloat(costAmount);

    if (!trimmedDesc || isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: 'Please enter a valid description and positive amount.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    dispatch(addCost({ description: trimmedDesc, amount: amountNum }))
      .then(() => {
        setCostDesc('');
        setCostAmount('');
      })
      .catch((error) => {
        toast({
          title: 'Failed to add cost',
          description: error.message || 'An error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  };

  const totalCost =
    items.reduce((acc, curr) => acc + (curr.cost || 0), 0) +
    otherCosts.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate('/login'))
      .catch((err) =>
        toast({
          title: 'Logout failed',
          description: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      );
  };

  return (
    <Box p={6} maxW="800px" mx="auto">
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading>Dashboard</Heading>
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>

      {/* Add Item Section */}
      <Box mb={6}>
        <Heading size="md" mb={2}>
          Add Item
        </Heading>
        <HStack>
          <Input
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            disabled={loading}
          />
          <Input
            placeholder="Cost"
            type="number"
            min="0"
            step="0.01"
            value={itemCost}
            onChange={(e) => setItemCost(e.target.value)}
            disabled={loading}
          />
          <Button
            colorScheme="blue"
            onClick={handleAddItem}
            isDisabled={
              loading || !itemName.trim() || !itemCost || parseFloat(itemCost) <= 0
            }
          >
            Add
          </Button>
        </HStack>
      </Box>

      {/* Add Other Cost Section */}
      <Box mb={6}>
        <Heading size="md" mb={2}>
          Add Other Cost
        </Heading>
        <HStack>
          <Input
            placeholder="Description"
            value={costDesc}
            onChange={(e) => setCostDesc(e.target.value)}
            disabled={loading}
          />
          <Input
            placeholder="Amount"
            type="number"
            min="0"
            step="0.01"
            value={costAmount}
            onChange={(e) => setCostAmount(e.target.value)}
            disabled={loading}
          />
          <Button
            colorScheme="green"
            onClick={handleAddCost}
            isDisabled={
              loading || !costDesc.trim() || !costAmount || parseFloat(costAmount) <= 0
            }
          >
            Add
          </Button>
        </HStack>
      </Box>

      <Divider my={4} />

      {/* Items List */}
      <Heading size="md" mb={2}>
        Items
      </Heading>
      {items.length === 0 ? (
        <Text>No items added yet.</Text>
      ) : (
        <VStack spacing={2} align="stretch" mt={2}>
          {items.map((item) => (
            <HStack key={item.id} justifyContent="space-between">
              <Text>
                {item.name} - ${item.cost.toFixed(2)}
              </Text>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => dispatch(deleteItem(item.id))}
              >
                Delete
              </Button>
            </HStack>
          ))}
        </VStack>
      )}

      {/* Other Costs List */}
      <Heading size="md" mt={6} mb={2}>
        Other Costs
      </Heading>
      {otherCosts.length === 0 ? (
        <Text>No other costs added yet.</Text>
      ) : (
        <VStack spacing={2} align="stretch" mt={2}>
          {otherCosts.map((cost) => (
            <HStack key={cost.id} justifyContent="space-between">
              <Text>
                {cost.description} - ${cost.amount.toFixed(2)}
              </Text>
              <Button
                colorScheme="red"
                size="sm"
                onClick={() => dispatch(deleteCost(cost.id))}
              >
                Delete
              </Button>
            </HStack>
          ))}
        </VStack>
      )}

      <Divider my={6} />
      <Heading size="lg">Total Project Cost: {totalCost.toFixed(2)}</Heading>
    </Box>
  );
}

export default Dashboard;
