import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function InfoCard({ title, status, onPress }) {
  const isSelesai = status === 'selesai';

  return (
    <View style={styles.card}>
      {/* Header Kartu: Judul di kiri, Badge di kanan */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.badge, isSelesai ? styles.badgeSelesai : styles.badgeProses]}>
          <Text style={[styles.badgeText, isSelesai ? styles.textSelesai : styles.textProses]}>
            {status.charAt(0).toUpperCase() + status.slice(1)} {/* Bikin huruf awal kapital */}
          </Text>
        </View>
      </View>

      {/* Tombol memanjang di bawah */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Lihat Detail</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 10, 
    marginBottom: 16, 
    // Efek shadow ala portal web
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
    borderWidth: 1, 
    borderColor: '#f0f0f0' 
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#333'
  },
  badge: { 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    borderRadius: 12, // Badge lebih membulat
  },
  badgeSelesai: { backgroundColor: '#d1e7dd' },
  badgeProses: { backgroundColor: '#fff3cd' },
  badgeText: { fontSize: 12, fontWeight: '600' },
  textSelesai: { color: '#0f5132' },
  textProses: { color: '#856404' },
  button: { 
    backgroundColor: '#1a73e8', // Warna biru terang ala Google
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '600',
    fontSize: 14
  }
});