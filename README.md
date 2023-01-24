## basic netflix clone in Next.js 
This project developed for basic next.js challenge. 
You got preloaded movies, and 

### Features
- Custom hook for scroll movies poster with listening mouse drag
- Accessibility fir screen readers
- Typescript
- Using react context storage to avoid refetching data.
- There is favorite page for list your favorite movies.

### Getting Started
Before the run you need to create a .env file for store OMDB API key (https://www.omdbapi.com/apikey.aspx) with name NEXTthere is a example on directory(.env.example)

#### First, run the development server:
```
npm run dev
```
or
```
yarn dev
```

#### ! can't use <Image /> for images because of Amazone CDN restrictions 

Open http://localhost:3000 with your browser to see the result.

