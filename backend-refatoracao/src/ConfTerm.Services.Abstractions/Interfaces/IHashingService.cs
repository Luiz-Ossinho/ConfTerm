namespace ConfTerm.Services.Abstractions.Interfaces
{
    public interface IHashingService
    {
        public byte[] GenerateSalt();
        public bool Compare(string plaintext, byte[] hash, byte[] salt);
        public byte[] GenerateHash(string plainText, byte[] salt);
    }
}
