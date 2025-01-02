/*
  This is a SAMPLE FILE to get you started.
  Please, follow the project instructions to complete the tasks.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Exemple de données de places
  const places = [
      {
          id: 1,
          name: "Hello Word Hbnb",
          price: 45,
          description: "Hello Word Hbnb Place to Rents.",
          image: "https://via.placeholder.com/300x200"
      },
      {
          id: 2,
          name: "Hello Word Hbnb",
          price: 80,
          description: "Hello Word Hbnb Place to Rent.",
          image: "https://via.placeholder.com/300x200"
      },
      {
          id: 3,
          name: "Hello Word Hbnb",
          price: 120,
          description: "Hello Word Hbnb Place to Rent.",
          image: "https://via.placeholder.com/300x200"
      },
      {
          id: 4,
          name: "Hello Word Hbnb",
          price: 200,
          description: "Hello Word Hbnb Place to Rent.",
          image: "https://via.placeholder.com/300x200"
      },
      {
          id: 5,
          name: "Hello Word Hbnb",
          price: 500,
          description: "Hello Word Hbnb Place to Rent",
          image: "https://via.placeholder.com/300x200"
      }
  ];

  // Fonction pour afficher les places
  function displayPlaces(filteredPlaces) {
      const placesList = document.getElementById('cards-container');
      placesList.innerHTML = ''; // Effacer les anciennes places

      filteredPlaces.forEach(place => {
          const placeElement = document.createElement('div');
          placeElement.className = 'place-card';
          placeElement.innerHTML = `
              <img src="${place.image}" alt="${place.name}">
              <h3>${place.name}</h3>
              <p>${place.description}</p>
              <p>Price: ${place.price} $</p>
          `;
          placesList.appendChild(placeElement);
      });
  }

  // Fonction pour filtrer les places par prix
  function filterPlaces() {
      const maxPrice = parseInt(document.getElementById('price-filter').value);

      // Filtrer les places en fonction du prix sélectionné
      const filteredPlaces = places.filter(place => place.price <= maxPrice || maxPrice === 0);

      // Afficher les places filtrées
      displayPlaces(filteredPlaces);
  }

  // Écouter le changement du select et appliquer le filtre
  document.getElementById('price-filter').addEventListener('change', filterPlaces);

  // Afficher toutes les places au début
  displayPlaces(places);
});
