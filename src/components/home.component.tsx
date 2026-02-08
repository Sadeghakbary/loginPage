import { useEffect, useState } from "react";
import { Box, Container, Typography, CircularProgress, Alert, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import UserService from "../service/user.service";

const Home: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await UserService.getPublicContent();
        setContent(response.data as string);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="md">
        <Grid container justifyContent="center">
          <Grid xs={12}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              {isLoading ? (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 120 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <Typography variant="h5" component="h2">
                  {content}
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
