// Copyright (c) 2012-2017, The CryptoNote developers, The Bytecoin developers
// Copyright (c) 2025, The Bitcoin Nova Developers
//
// This file is part of Bytecoin.
//
// Bytecoin is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Bytecoin is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with Bytecoin.  If not, see <http://www.gnu.org/licenses/>.

#include <stddef.h>
#include <stdint.h>
#include <string.h>

#include "hash.h"
#include "keccak.h"

namespace Crypto
{
    void hash_permutation(union hash_state *state)
    {
        keccakf((uint64_t*)state, KECCAK_ROUNDS);
    }

    void hash_process(union hash_state *state, const uint8_t *buf, size_t count)
    {
        keccak1600(buf, (int)count, (uint8_t*)state);
    }

    void cn_fast_hash(const void *data, size_t length, char *hash)
    {
        union hash_state state;
        hash_process(&state, reinterpret_cast<const uint8_t *>(data), length);
        memcpy(hash, &state, HASH_SIZE);
    }

    void cn_fast_hash(const void *data, size_t length, Hash &hash)
    {
        cn_fast_hash(data, length, reinterpret_cast<char *>(&hash));
    }

    Hash cn_fast_hash(const void *data, size_t length)
    {
        Hash h;
        cn_fast_hash(data, length, reinterpret_cast<char *>(&h));
        return h;
    }
}
