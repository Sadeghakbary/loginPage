import { Box, Container, Typography, CircularProgress, Paper, Stack, Divider, Chip } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ py: 6 }}>
        <Container maxWidth="md">
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 120 }}>
            <CircularProgress />
          </Box>
        </Container>
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
          <Stack spacing={2}>
            <Typography variant="h5" component="h2">
              <strong>{user.username}</strong> Profile
            </Typography>
            <Divider />
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Token
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                {user.accessToken.substring(0, 20)} ...{" "}
                {user.accessToken.substring(user.accessToken.length - 20)}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Id
              </Typography>
              <Typography variant="body1">{user.id}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Authorities
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {user.roles &&
                  user.roles.map((role: string, index: number) => (
                    <Chip key={index} label={role} variant="outlined" />
                  ))}
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
