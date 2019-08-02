export default function host() {
  return new URL(location.href).origin;
}
