export default function host() {
    return location.href.match(/(http(s?):\/\/(.*))\//)[1];
}