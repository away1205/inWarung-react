const baseUrl = `${import.meta.env.VITE_DATABASE_URI}/api/categories/`;

export async function createCategory(category) {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    const newCategory = await response.json();
    console.log('Category created:', newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
  }
}

export async function getCategories() {
  try {
    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function updateCategory(id, updatedCategory) {
  try {
    const response = await fetch(`${baseUrl}${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCategory),
    });
    const updated = await response.json();
    console.log('Category updated:', updated);
  } catch (error) {
    console.error('Error updating category:', error);
  }
}

export async function deleteCategory(id) {
  try {
    const response = await fetch(`${baseUrl}${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      console.log('Category deleted:', id);
    } else {
      console.error('Error deleting category:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting category:', error);
  }
}
