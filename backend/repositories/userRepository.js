import { supabase } from "../database/connection.js";
import { AppError } from "../errors/index.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export const userRepository = {
 async findById(id) {
  const { data, error } = await supabase
   .from("users")
   .select("*")
   .eq("id", id)
   .maybeSingle();
  if (error && error.code !== "PGRST116") throw AppError.internal(error.message);
  return data || null;
 },

 async findByEmail(email) {
  const { data, error } = await supabase
   .from("users")
   .select("*")
   .eq("email", email)
   .maybeSingle();
  if (error) throw AppError.internal(error.message);
  return data || null;
 },

 async findByPhone(phone) {
  const { data, error } = await supabase
   .from("users")
   .select("*")
   .eq("phone", phone)
   .maybeSingle();
  if (error) throw AppError.internal(error.message);
  return data || null;
 },

 async findByLogin(login) {
  return (await this.findByEmail(login)) || (await this.findByPhone(login));
 },

 async emailExists(email) {
  const { count, error } = await supabase
   .from("users")
   .select("id", { count: "exact", head: true })
   .eq("email", email);
  if (error) throw AppError.internal(error.message);
  return (count || 0) > 0;
 },

 async emailExistsExcluding(email, userId) {
  const { count, error } = await supabase
   .from("users")
   .select("id", { count: "exact", head: true })
   .eq("email", email)
   .neq("id", userId);
  if (error) throw AppError.internal(error.message);
  return (count || 0) > 0;
 },

 async phoneExists(phone) {
  const { count, error } = await supabase
   .from("users")
   .select("id", { count: "exact", head: true })
   .eq("phone", phone);
  if (error) throw AppError.internal(error.message);
  return (count || 0) > 0;
 },

 async phoneExistsExcluding(phone, userId) {
  const { count, error } = await supabase
   .from("users")
   .select("id", { count: "exact", head: true })
   .eq("phone", phone)
   .neq("id", userId);
  if (error) throw AppError.internal(error.message);
  return (count || 0) > 0;
 },

 async isSecretCodeUnique(code, excludeUserId = null) {
  const hash = await this.hashSecretCode(code);
  let query = supabase.from("users").select("id", { count: "exact", head: true }).eq("secret_code_hash", hash);
  if (excludeUserId) {
   query = query.neq("id", excludeUserId);
  }
  const { count, error } = await query;
  if (error) throw AppError.internal(error.message);
  return (count || 0) === 0;
 },

 async hashSecretCode(code) {
  return bcrypt.hash(code, SALT_ROUNDS);
 },

 async generateUniqueCode() {
  const { data, error } = await supabase.rpc("generate_unique_user_code");
  if (error) throw AppError.internal(error.message);
  return data;
 },

 async verifySecretCode(code, hash) {
  return bcrypt.compare(code, hash);
 },

 async create({ id, full_name, email, phone, secret_code_hash, unique_user_code }) {
  const { data, error } = await supabase
   .from("users")
   .insert({ id, full_name, email, phone, secret_code_hash, unique_user_code })
   .select("*")
   .single();
  if (error) throw AppError.conflict(error.message);
  return data;
 },

 async update(id, fields) {
  const { data, error } = await supabase
   .from("users")
   .update({ ...fields, updated_at: new Date().toISOString() })
   .eq("id", id)
   .select("*")
   .single();
  if (error) throw AppError.internal(error.message);
  return data;
 },

 async updateLastLogin(id) {
  await supabase
   .from("users")
   .update({ last_login: new Date().toISOString(), updated_at: new Date().toISOString() })
   .eq("id", id);
 },

 async setStatus(id, status) {
  await supabase
   .from("users")
   .update({ status, updated_at: new Date().toISOString() })
   .eq("id", id);
 },
};

export default userRepository;
