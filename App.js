import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, SafeAreaView, Alert, ScrollView } from 'react-native';
import InfoCard from './src/components/InfoCard';
import { DAFTAR_MAHASISWA } from './src/data/mahasiswa';

export default function App() {
  const [keyword, setKeyword] = useState('');

  // Logika Filter (Soal 2)
  const filteredData = DAFTAR_MAHASISWA.filter((item) =>
    item.nama.toLowerCase().includes(keyword.toLowerCase())
  );

  // Fungsi untuk mengambil inisial (misal "Alifia Putri" jadi "AP")
  const getInitials = (name) => {
    let initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER UTAMA */}
        <View style={styles.topHeaderContainer}>
          <View>
            <Text style={styles.mainTitle}>Portal Akademik</Text>
            <Text style={styles.subTitle}>Manajemen Tugas & Rekap Mahasiswa</Text>
          </View>
          
          {/* Navigasi Hitam Kanan Atas */}
          <View style={styles.navBar}>
            <Text style={styles.navLogo}>Expo Starter</Text>
            <View style={styles.navLinks}>
              <Text style={styles.navLinkActive}>Home</Text>
              <Text style={styles.navLink}>Explore</Text>
              <Text style={styles.navLink}>Docs</Text>
            </View>
          </View>
        </View>

        {/* BAGIAN TUGAS PRAKTIKUM (SOAL 1) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tugas & Praktikum</Text>
          <View style={styles.counterBadge}><Text style={styles.counterText}>3</Text></View>
        </View>

        <InfoCard 
          title="Praktikum Setup Environment" 
          status="selesai" 
          onPress={() => Alert.alert('Detail', 'Tugas ini telah diselesaikan.')} 
        />
        <InfoCard 
          title="Pengerjaan Tugas UTS Mobile" 
          status="proses" 
          onPress={() => Alert.alert('Detail', 'UTS sedang dalam pengerjaan.')} 
        />
        <InfoCard 
          title="Pengerjaan Tugas Lab Administrasi Sistem dan Jaringan" 
          status="proses" 
          onPress={() => Alert.alert('Detail', 'Tugas Jaringan Terapan masih dalam proses.')} 
        />

        {/* BAGIAN DAFTAR MAHASISWA (SOAL 2) */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Daftar Mahasiswa</Text>
          <View style={styles.counterBadge}><Text style={styles.counterText}>{filteredData.length}</Text></View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Cari nama atau program studi..."
          value={keyword}
          onChangeText={setKeyword}
        />

        {/* List Mahasiswa (Tidak pakai FlatList karena di dalam ScrollView web lebih aman di-map) */}
        <View style={styles.listContainer}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <View key={item.id} style={styles.studentItem}>
                {/* Ikon Profil Bulat */}
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{getInitials(item.nama)}</Text>
                </View>
                
                {/* Detail Teks */}
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{item.nama}</Text>
                  <Text style={styles.studentDesc}>{item.prodi} • NIM: {item.nim}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Data tidak ditemukan!</Text>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fafafa' // Background abu-abu sangat terang
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
    maxWidth: 1200, // Agar di layar lebar (web) tetap di tengah seperti gambar
    alignSelf: 'center',
    width: '100%',
  },
  topHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    flexWrap: 'wrap', // Agar di HP layarnya tidak nabrak
    gap: 20
  },
  mainTitle: { fontSize: 24, fontWeight: '800', color: '#1a1a1a', marginBottom: 4 },
  subTitle: { fontSize: 14, color: '#666' },
  navBar: {
    backgroundColor: '#1f1f1f', // Warna hitam navigasi
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 40
  },
  navLogo: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  navLinks: { flexDirection: 'row', gap: 20 },
  navLinkActive: { color: '#fff', fontWeight: '600' },
  navLink: { color: '#a0a0a0', fontWeight: '500' },
  
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  counterBadge: { backgroundColor: '#e0e0e0', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 },
  counterText: { fontSize: 12, fontWeight: 'bold', color: '#555' },

  input: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderWidth: 1, 
    borderColor: '#e8aa62', // Outline orange seperti di gambar
    borderRadius: 8, 
    marginBottom: 20,
    fontSize: 14
  },
  
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, 
  },
  studentItem: { 
    flexDirection: 'row', 
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f0fe', // Biru sangat muda
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  avatarText: {
    color: '#1a73e8', // Biru teks
    fontWeight: 'bold',
    fontSize: 14
  },
  studentInfo: { flex: 1 },
  studentName: { fontWeight: '700', fontSize: 15, color: '#333', marginBottom: 4 },
  studentDesc: { fontSize: 13, color: '#777' },
  emptyText: { textAlign: 'center', color: '#dc3545', marginTop: 20, fontStyle: 'italic' }
});