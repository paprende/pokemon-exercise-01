### Coding Exercise: Build a Pokémon Encyclopedia

#### Objective:

Build a Pokémon encyclopedia web application that fetches and displays detailed information about a specific Pokémon from the [PokeAPI](https://pokeapi.co/).

#### Requirements:

1. **UI Design**:

   - The layout should resemble the Pokémon Pokedex entry (refer to UX.png)
   - The application should include:
     - **Pokémon Image**: Display the Pokémon's image.
     - **Name**: Display the Pokémon's name.
     - **ID**: Show the unique Pokémon ID.
     - **Type(s)**: Display the Pokémon's type(s) (e.g., Grass, Poison).
     - **Height & Weight**: Display the height and weight of the Pokémon.
     - **Abilities**: List the abilities of the Pokémon.
     - **Stats**: Show the stats (e.g., HP, Attack, Defense, Speed).
   - Add styling to ensure the web app looks clean and polished.

2. **Components**:

   - Create a main component for displaying Pokémon details.
   - Create a service to fetch data from the [PokeAPI](https://pokeapi.co/).
   - Organize the UI into smaller reusable components like Pokémon image, stats, and abilities.

   For example if you did GET https://pokeapi.co/api/v2/pokemon/ditto

   you will get something like

   {
      "name": "ditto",
      "order": 214,
      "abilities": [
      {
        "ability": {
          "name": "limber",
          "url": "https://pokeapi.co/api/v2/ability/7/"
        },
        "is_hidden": false,
        "slot": 1
      },
      "base_experience": 101,
      "sprites": {
         "front": "...",
         "back": "..."
      }
   }

3. **Fetch Data**:

   - Use a http client to make a GET request to the PokeAPI.
   - Fetch data for a specific Pokémon based on its name or ID (e.g., "bulbasaur" or "1").

4. **Search Feature**:

   - Implement a search bar where users can type the name of any Pokémon.
   - Once the user searches for a Pokémon, the app should fetch and display information for the entered Pokémon.
   - Handle invalid inputs by showing a user-friendly error message (e.g., "Pokémon not found").

5. **Error Handling**:

   - Implement error handling for invalid or missing Pokémon data using react's error handling mechanisms (e.g., `.catchError()`).
   - Display an appropriate error message when the user inputs a non-existent Pokémon name.

6. **Responsive Design**:

   - Ensure the application is mobile-responsive using CSS or a framework like **react Material** for better UI components and responsiveness.

#### Technologies:

- **Frontend**: react(using react CLI for setup), HTML, CSS (or react Material).
- **API**: [PokeAPI](https://pokeapi.co/).
- **HTTP Requests**: react's `HttpClient`.

Good luck and happy coding!
