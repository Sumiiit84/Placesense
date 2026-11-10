
import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
    try {
        const {
            full_name,
            email,
            password,
            role
        } = req.body || {};

        // Check empty fields
        if (!full_name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Normalize input
        const name = full_name.trim();
        const userEmail = email.trim().toLowerCase();
        const userRole = String(role).trim().toLowerCase();

        // Validate role
        const allowedRoles = ["student", "admin", "company"];

        if (!allowedRoles.includes(userRole)) {
            return res.status(400).json({
                message: "Invalid role"
            });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters"
            });
        }

        // Check existing email
        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [userEmail]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into PostgreSQL
        const result = await pool.query(
            `INSERT INTO users
            (full_name, email, password_hash, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, full_name, email, role, created_at`,
            [name, userEmail, hashedPassword, userRole]
        );

        return res.status(201).json({
            message: "Account created successfully!",
            user: result.rows[0]
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        return res.status(500).json({
            message: "Server error"
        });
    }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body || {};

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const userEmail = email.trim().toLowerCase();
    const userRole = role.trim().toLowerCase();

    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [userEmail]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    if (user.role.toLowerCase() !== userRole) {
      return res.status(403).json({
        message: "Selected role does not match your account"
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Server error"
    });
  }
};