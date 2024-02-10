/** @format */

const cart = () => {
  const items = [
    {
      id: 'a1',
      price: 150,
      quantity: 3,
    },
    {
      id: 'b2',
      price: 100,
      quantity: 4,
    },
    {
      id: 'c3',
      price: 250,
      quantity: 5,
    }
  ]

  const total = () => {
    function sum(total, item) {
      return total + (item.price * item.quantity)
    }
    
    return items.reduce(sum, 0)
  }

	const add = (item) => {
    items.push(item)
  }

  const remove = (id) => {
    let index = items.findIndex(item => item.id == id)
    items.splice(index, 1)
  }

  const update = (id, quantity) => {
    const item = items.find(item => item.id == id)
    if (item) {
      item.quantity = quantity
    }
  }

  const clear = () => {
    items.length = 0
  }

	return {items, add, remove, update, clear, total}
}

export default cart