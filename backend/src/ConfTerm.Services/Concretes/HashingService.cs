using ConfTerm.Services.Abstractions.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace ConfTerm.Services.Concretes
{
    public class HashingService : IHashingService
    {
        public bool Compare(string plaintext, byte[] hash, byte[] salt)
        {
            return hash.SequenceEqual(GenerateHash(plaintext, salt));
        }

        public byte[] GenerateHash(string plainText, byte[] salt)
        {
            using var algorithm = SHA256.Create();
            return algorithm.ComputeHash(Encoding.UTF8.GetBytes(plainText).Concat(salt).ToArray());
        }

        public byte[] GenerateSalt()
        {
            using var RNG = RandomNumberGenerator.Create();
            var bytes = new byte[16];
            RNG.GetBytes(bytes);
            return bytes;
        }
    }
}
