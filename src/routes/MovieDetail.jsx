// MovieDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadMovie = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://swapi.py4e.com/api/films/${id}`);
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMovie();
  }, [id]);

  return (
    <Container>
      <BackButton />

      {!loading ? (
        <VStack spacing={4} alignItems="flex-start">
          <Heading as="h1" size="xl">
            {movie?.title}
          </Heading>
          <Text>
            <strong>Episode:</strong> {movie?.episode_id}
          </Text>
          <Text>
            <strong>Release Date:</strong> {movie?.release_date}
          </Text>
          <Divider />
          <Text>{movie?.opening_crawl}</Text>

          <Heading as="h2" size="lg" marginTop={5}>
            Characters
          </Heading>
          <SimpleGrid columns={2} spacing={4}>
            {movie?.characters?.map((character, index) => (
              <Box key={index}>{character}</Box>
            ))}
          </SimpleGrid>
        </VStack>
      ) : (
        <Text>Loading...</Text>
      )}
    </Container>
  );
};

export default MovieDetail;
