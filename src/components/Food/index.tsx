import { useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";

import { Container } from "./styles";
import api from "../../services/api";

interface FoodInterface {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface FoodComponentInterface {
  foodData: FoodInterface;
  handleEditFood(data: FoodInterface): void;
  handleDelete(id: number): void;
}

const Food: React.FC<FoodComponentInterface> = ({
  foodData,
  handleEditFood,
  handleDelete,
}) => {
  const [isAvailable, setIsAvailable] = useState(foodData.available);

  const toggleAvailable = async () => {
    await api.put(`/foods/${foodData.id}`, {
      ...foodData,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable);
  };

  const setEditingFood = () => {
    handleEditFood(foodData);
  };

  return (
    <Container available={isAvailable}>
      <header>
        <img src={foodData.image} alt={foodData.name} />
      </header>
      <section className="body">
        <h2>{foodData.name}</h2>
        <p>{foodData.description}</p>
        <p className="price">
          R$ <b>{foodData.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${foodData.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(foodData.id)}
            data-testid={`remove-food-${foodData.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${foodData.id}`} className="switch">
            <input
              id={`available-switch-${foodData.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${foodData.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;
