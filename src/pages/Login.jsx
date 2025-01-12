/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../Stores/userSlice";
import background from "../assets/background-img.jpg";

const Container = styled('div')({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw", // Full width of the viewport
  height: "100vh", // Full height of the viewport
  backgroundImage: `url(${background})`, // Use the imported background image
  backgroundSize: "cover", // Ensure the background image covers the entire viewport
  backgroundPosition: "center", // Center the background image
  backgroundRepeat: "no-repeat", // Avoid tiling the background image
  overflow: "hidden", // Prevent unwanted scrollbars
});

// Styled paper component with glassmorphism effect
const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.2)",
  width: "400px",
  textAlign: "center",
}));

// Title with gradient text
const Title = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: "700",
  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: theme.spacing(3),
  fontSize: "2.5rem",
}));

// Input field with modern styling
const InputField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
}));

// Button with hover animation
const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
  color: "#fff",
  padding: theme.spacing(1.5, 4),
  borderRadius: 8,
  fontWeight: "600",
  textTransform: "none",
  fontSize: "1rem",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  },
}));

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await dispatch(loginUser({ username, password })).unwrap();
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <PaperStyled>
        <Title variant="h4">Welcome Back</Title>

        <form onSubmit={handleLogin}>
          <InputField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <InputField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <ButtonStyled type="submit" fullWidth variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </ButtonStyled>
        </form>

        <ToastContainer />
      </PaperStyled>
    </Container>
  );
};

export default LoginPage;
