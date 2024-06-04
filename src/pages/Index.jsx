import React, { useState, useRef } from "react";
import { Container, Button, VStack, Text, Input, useToast, IconButton, Box } from "@chakra-ui/react";
import { FaQrcode, FaSave, FaArrowLeft } from "react-icons/fa";

const Index = () => {
  const [scannedValue, setScannedValue] = useState("");
  const [values, setValues] = useState([]);
  const toast = useToast();
  const fileInputRef = useRef(null);

  const handleScan = () => {
    // Simulate scanning a QR code
    const simulatedValue = "Simulated QR Code Value";
    setScannedValue(simulatedValue);
    toast({
      title: "QR Code Scanned",
      description: `Value: ${simulatedValue}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSave = () => {
    if (scannedValue) {
      setValues([...values, scannedValue]);
      setScannedValue("");
      toast({
        title: "Value Saved",
        description: `Value: ${scannedValue} has been saved.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "No Value to Save",
        description: "Please scan a QR code first.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," + values.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "scanned_values.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">QR Code Scanner</Text>
        <Button leftIcon={<FaQrcode />} colorScheme="teal" onClick={handleScan}>
          Scan QR Code
        </Button>
        {scannedValue && (
          <Box>
            <Text>Scanned Value: {scannedValue}</Text>
            <Button leftIcon={<FaSave />} colorScheme="blue" onClick={handleSave}>
              Save Value
            </Button>
          </Box>
        )}
        <Button leftIcon={<FaArrowLeft />} colorScheme="gray" onClick={() => setScannedValue("")}>
          Scan Another
        </Button>
        {values.length > 0 && (
          <Button leftIcon={<FaSave />} colorScheme="green" onClick={handleDownload}>
            Download CSV
          </Button>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
