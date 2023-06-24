// Movies.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moviesThumbnail from "../assets/movies.jpeg";
import BackButton from "../components/BackButton";
import {
  Card,
  SimpleGrid,
  CardBody,
  Text,
  Image,
  HStack,
  Container,
  Heading,
} from "@chakra-ui/react";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://swapi.py4e.com/api/films");
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <Container>
      <HStack direction="row" marginTop={5} marginBottom={5}>
        <BackButton />
        <Image src={moviesThumbnail} alt="Movies Thumbnail" width="40px" />
        <Heading as="h1" size="xl">
          Movies
        </Heading>
      </HStack>

      {!loading ? (
        <SimpleGrid columns={2} spacing={4}>
          {movies.length > 0 &&
            movies.map((movie, index) => (
              <Card key={index}>
                <Link to={`/star-wars/movies/${index + 1}`}>
                  <CardBody>
                    <Heading as="h2" size="md">
                      {movie.title}
                    </Heading>
                  </CardBody>
                </Link>
              </Card>
            ))}
        </SimpleGrid>
      ) : (
        <Text>Loading...</Text>
      )}
    </Container>
  );
};

export default Movies;
