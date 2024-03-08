## Project Folder Structure
<pre>
..
├── henry          # This repo
    ├── node_modules        # Dependencies, do not commit
    ├── public          
    ├── src 
    │   ├── assets            # Contains a few henry assets
    │   ├── components      # All React components of the frontend, add new components (pages or other rendered objects) here
    │   ├── pages    # Pages handled by react-router-dom
    │   ├── state    # Redux toolkit state and reducers
    │   └── router   # Contains all routers
    └── ...
</pre>

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Known Shortcomings

Due to time restraints was not able to 100% finish the tasks the only one being `Reservations must be made at leasxt 24 hours in advance`.

## With more time what I would add
- I would add more validation to make it so you cannot set an appointment in the past.
- Make it so you could do all CRUD operations on the schedule as the provider.
- Improve the UI
