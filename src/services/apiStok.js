const baseUrl = `${import.meta.env.VITE_DATABASE_URI}/api/restocks/`;

export async function createRestock(restock) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restock),
    });
    const newRestock = await response.json();
    console.log('Restock created:', newRestock);
    return newRestock;
  } catch (error) {
    console.error('Error creating restock:', error);
    throw error;
  }
}

export async function getAllRestocks() {
  try {
    const response = await fetch(baseUrl);
    const restocks = await response.json();

    return restocks;
  } catch (error) {
    console.error('Error retrieving restocks:', error);
    throw error;
  }
}

export async function getSpecificRestock(id_product) {
  try {
    const response = await fetch(`${baseUrl}${id_product}`);
    const restock = await response.json();
    return restock;
  } catch (error) {
    console.error('Error retrieving restock:', error);
    throw error;
  }
}

export async function updateRestock(id, updatedRestock) {
  try {
    const response = await fetch(`${baseUrl}${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRestock),
    });
    const restock = await response.json();
    console.log('Restock updated:', restock);
    return restock;
  } catch (error) {
    console.error('Error updating restock:', error);
    throw error;
  }
}

export async function deleteRestock(id) {
  try {
    const response = await fetch(`${baseUrl}${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log('Restock deleted');
      return true;
    } else {
      throw new Error('Error deleting restock');
    }
  } catch (error) {
    console.error('Error deleting restock:', error);
    throw error;
  }
}
