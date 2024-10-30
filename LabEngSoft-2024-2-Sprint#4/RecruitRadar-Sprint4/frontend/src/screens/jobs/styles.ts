import { Dimensions, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  confirmationMessage: {
    position: "absolute",
    top: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Coloca a mensagem acima de outros componentes
  },

  confirmationText: {
    backgroundColor: "green",
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
  header: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profile: {
    width: 35,
    height: 35,
    tintColor: "#0262A6",
  },
  cardCompanyImage: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileIcon: {
    position: "absolute", // Permite que o ícone seja posicionado livremente
    top: 0, // Posiciona o ícone no topo
    right: 20, // Ajuste a posição conforme necessário
  },
  titlePrimary: {
    fontWeight: "800",
    fontSize: 23,
    color: "#0262A6",
  },
  titlePrimaryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  logo: {
    width: 30,
    height: 30,
  },
  logoutIcon: {
    position: "absolute",
    top: 0,
    left: 20,
    width: 10,
    height: 10,
  },
  imageLogo: {
    marginTop: 0,
    marginBottom: 15,
  },
  companyImage: {
    width: 36,
    height: 36,
    borderRadius: 2,
    marginRight: 10,
    resizeMode: "contain",
  },
  cardImageUser: {
    flexDirection: "row",
  },
  imageUser: {
    width: 26,
    height: 26,
    borderRadius: 8,
    marginRight: 10,
    tintColor: "#8EE783",
  },
  cardcontainer: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    maxWidth: 3000,
    maxHeight: 3000,
  },
  card: {
    backgroundColor: "#47B3FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 300,
    height: 400,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    //backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  companyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  companyName: {
    fontSize: 20,
    color: "white",
    fontWeight: "regular",
  },
  location: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "white",
    marginVertical: 5,
  },
  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  matchIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  matchMessage: {
    fontSize: 16,
    color: "#8EE783",
    fontWeight: "bold",
  },
  datePosted: {
    fontSize: 14,
    color: "white",
    marginTop: 10,
  },
  detailsLink: {
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 18,
    textDecorationLine: "underline",
    textAlign: "right",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#007bff",
    position: "absolute",
    paddingVertical: 10,
    bottom: 0,
    width: "100%",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 1,
  },
  navItemContent: {
    alignItems: "center", // Centraliza o conteúdo (ícone + texto)
    justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "#fff",
  },
  containerLike: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: -80,
  },
  like: {
    width: 50,
    height: 50,
    tintColor: "green",
  },
  dislike: {
    width: 50,
    height: 50,
    tintColor: "red",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
  },
  textHome: {
    color: "white",
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semitransparente para destacar o modal
  },
  modalContent: {
    width: "90%", // Aumenta a largura para ocupar 90% da tela
    height: "80%", // Aumenta a altura para 80% da tela
    backgroundColor: "#47B3FF",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between", // Distribui o conteúdo
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    color: "white",
    maxWidth: "100%",
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    color: "black",
    width: "80%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    flexWrap: "wrap",
    flexShrink: 1,
    maxWidth: "100%",
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: "white",
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 2,
    marginRight: 10,
    resizeMode: "contain",
  },
  backIcon: {
    width: 24,
    height: 24,
    color: "black",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  sectionTitle2: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
    color: "white",
  },

  sidebar: {
    width: "70%", // 70% da largura da tela
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  closeSidebar: {
    alignSelf: "flex-end",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  menuItem: {
    fontSize: 16,
    color: "#007bff",
    paddingVertical: 10,
  },
  content: {
    flex: 1,
    //marginTop: 0,
    width: "100%",
    paddingHorizontal: 15,
    //alignItems: 'center',
    padding: 20,
  },
  swiperContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  swiper: {
    width: Dimensions.get("window").width * 0.85, // Define uma largura fixa para o Swiper
    height: 450, // Altura fixa para o Swiper
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 555,
  },
  likeButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  dislikeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  noMoreJobsContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Fundo semitransparente
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    paddingBottom: 100, // Espaçamento abaixo do conteúdo
  },
  noMoreJobsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#737380",
    textAlign: "center", // Centraliza o texto
    height: 80,
    marginTop: 0, // Espaçamento acima do texto,
    fontStyle: "normal",
  },
  locationDisabledText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  noMoreJobsImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  permissionRequestText: {
    color: "blue",
    fontSize: 16,
    textDecorationLine: "underline",
    marginTop: 10,
    backgroundColor: "yellow", // Adicione temporariamente para verificar a exibição
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingLogo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "cover",
  },
  loadingText: {
    color: "#0262A6",
    fontSize: 18,
    marginTop: 20,
  },
});