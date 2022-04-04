import { Container } from "@mui/material";
import MainContent from "../components/MainContent";

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <MainContent />
    </Container>
  );
}

export default HomePage;
