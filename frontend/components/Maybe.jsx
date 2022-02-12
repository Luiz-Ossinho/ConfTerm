export default function Maybe({ test, children }) {
    if (test) return <>{test&&children}</>;
    return <></>;
}