'use client'
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { createElement, useCallback, useContext, useEffect, useState } from 'react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

import { Button, Card, Label, TextInput, Textarea, Radio, Select, Timeline } from 'flowbite-react'
import { Calendar, CreditCard, MapPin, User, CheckCircle, Clock, ThumbsUp, DollarSign, Award, Mail, Phone, Loader2, Info, XCircle } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation';
import { formatCurrency } from '../../ultilities/formator';
import { CartContext } from '../components/cartContext';
import { collection, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db, stripe } from '../api/config/config';
import CartProduct from '../components/cartProduct';

type CheckoutStep = 'travel-details' | 'passenger-info' | 'payment' | 'review' | 'confirmation';

export default function TravelCheckout() {
    const cart = useContext(CartContext);
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')
    const [currentStep, setCurrentStep] = useState<CheckoutStep>('passenger-info');
    const [bookings, setBookings] = useState<any>();

    const steps = [
        { id: 'travel-details', label: 'Booking submitted', icon: MapPin },
        { id: 'passenger-info', label: 'Under reviewing by our support', icon: User },
        { id: 'payment', label: 'Payment', icon: CreditCard },
        { id: 'review', label: 'The payment has been completet', icon: CheckCircle },
        { id: 'confirmation', label: 'Confirmation', icon: Award },
    ];

    const handleNextStep = () => {
        if (currentStep === 'travel-details') setCurrentStep('passenger-info');
        else if (currentStep === 'passenger-info') setCurrentStep('payment');
        else if (currentStep === 'payment') setCurrentStep('review');
        else if (currentStep === 'review') setCurrentStep('confirmation');
    };

    const handlePrevStep = () => {
        if (currentStep === 'confirmation') setCurrentStep('review');
        else if (currentStep === 'review') setCurrentStep('payment');
        else if (currentStep === 'payment') setCurrentStep('passenger-info');
        else if (currentStep === 'passenger-info') setCurrentStep('travel-details');
    };

    // Fetch booking data from Firestore
    const updateBookingData = async (session_id: string) => {
        try {
            const session = await stripe.checkout.sessions.retrieve(session_id);
            if (session.payment_status !== "paid") return alert("Invalid Session ID")
            const userJSON = localStorage.getItem('user');
            if (!userJSON) throw new Error("User not found in localStorage");

            const user = JSON.parse(userJSON);
            const q = query(
                collection(db, "Bookings"),
                where("uid", "==", user.uid),
                where("status", "==", "approved")
            );

            const querySnapshot = await getDocs(q);

            // Update each document
            const updatePromises = querySnapshot.docs.map((doc) =>
                updateDoc(doc.ref, {
                    status: "paid",
                })
            );

            // Wait for all updates to complete
            await Promise.all(updatePromises);

            console.log("All bookings have been updated to 'paid'");
        } catch (error) {
            console.error("Error fetching bookings:", error);

        }
    };
    useEffect(() => {
        console.log("PATH : ", searchParams)
        if (session_id) {

            setCurrentStep('review')
            updateBookingData(session_id);

        }
    }, [searchParams]);


    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval); // Stop the timer when it reaches 0
                    return 0;
                }
                return prev - 1; // Decrease time by 1 second
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const statusConfig = {
        waiting: {
            color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700",
            icon: Clock,
            label: "Waiting"
        },
        approved: {
            color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700",
            icon: CheckCircle,
            label: "Approved"
        },
        rejected: {
            color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700",
            icon: XCircle,
            label: "Rejected"
        },
        paid: {
            color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700",
            icon: XCircle,
            label: "Paid"
        },
    }



    // Format time as mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    const fetchBookingData = async () => {
        try {
            const userJSON = localStorage.getItem('user');
            if (!userJSON) throw new Error('No user found');

            const user = JSON.parse(userJSON);
            const q = query(collection(db, "Bookings"), where("uid", "==", user.uid),where("status","in",['waiting','approved','rejected']));

            // Create a Set to store unique booking IDs
            const uniqueBookingIds = new Set();

            const querySnapshot = await getDocs(q);
            const initialResults = querySnapshot.docs.map(doc => {
                const bookingData = { id: doc.id, ...doc.data() };

                // Add booking ID to the Set and check for existence before adding
                if (!uniqueBookingIds.has(bookingData.id)) {
                    uniqueBookingIds.add(bookingData.id);
                    return bookingData;
                } else {
                    console.warn(`Duplicate booking with ID: ${bookingData.id} found and ignored.`);
                    return null; // Or perform other desired action for duplicates (e.g., logging)
                }
            }).filter(data => data !== null); // Remove null values from filtered results

            setBookings(initialResults);

            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    switch (change.type) {
                        // case "added":
                        //     const addedBooking = { id: change.doc.id, ...change.doc.data() };
                          
                        //     // Try adding the booking ID to the Set. If it fails (duplicate), ignore
                        //     if (!uniqueBookingIds.add(addedBooking.id)) {
                        //       console.warn(`Duplicate booking with ID: ${addedBooking.id} found and ignored.`);
                        //     } else {
                        //       // Update state only if the booking ID was unique
                        //       setBookings(prev => [...prev, addedBooking]);
                        //     }
                        //     break;
                        case "modified":
                            setBookings(prev => prev.map(item =>
                                item.id === change.doc.id ? { id: change.doc.id, ...change.doc.data() } : item
                            ));
                            break;
                        case "removed":
                            setBookings(prev => prev.filter(item => item.id !== change.doc.data().id)); // Use `change.doc.data().id` for clarity
                            break;
                    }
                });
            });

            return unsubscribe; // Return unsubscribe function for cleanup
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };
    useEffect(() => {
        if (currentStep == 'passenger-info')
            fetchBookingData();
    }, [currentStep]);

    return (
        <div className="container w-[70vw] mx-auto p-4 mt-5">
            <div>
                <h1 className="text-2xl font-bold mb-6">Travel Booking Checkout</h1>

                <ol className="relative flex flex-col sm:flex-row">
                    {steps.map((item, index) => (
                        <li key={index} className="flex-1 mb-6 sm:mb-0">
                            <div className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= steps.findIndex((s) => s.id === currentStep)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {createElement(item.icon, { size: 20 })}
                                </div>
                                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                            </div>
                            <div className="mt-3 sm:pr-8">
                                <h3 className="text-lg text-gray-900 dark:text-white">
                                    {item.label}
                                </h3>
                            </div>
                        </li>
                    ))}
                </ol>

                {/* Form Steps */}
                {currentStep === 'travel-details' && (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="destination">Destination</Label>
                            <TextInput id="destination" type="text" placeholder="Enter your destination" required icon={MapPin} />
                        </div>
                        <div>
                            <Label htmlFor="travel-date">Travel Date</Label>
                            <TextInput id="travel-date" type="date" required icon={Calendar} />
                        </div>
                        <div>
                            <Label htmlFor="travel-type">Travel Type</Label>
                            <Select id="travel-type">
                                <option>One-way</option>
                                <option>Round-trip</option>
                                <option>Multi-city</option>
                            </Select>
                        </div>
                    </div>
                )}

                {currentStep === 'passenger-info' && (
                    <div className="w-full max-w-4xl mx-auto p-4">
                        <div>
                            <h5 className="text-lg font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-4 rounded-t-lg">
                                Booking detail
                            </h5>
                            <div className="grid md:grid-cols-2 gap-6 p-6">
                                {/* Left Section */}
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Item:</div>
                                        <div className="grid items-start gap-3">
                                            {/* <Boat className="h-5 w-5 text-blue-600 mt-0.5" /> */}
                                            {bookings?.map((item, index) =>
                                                <>


                                                    <div className="justify-between flex gap-2 w-full ">
                                                        <div className="flex items-center gap-3">
                                                            <MapPin className="h-5 w-5 text-gray-500" />
                                                            <div>
                                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                    Pick up at
                                                                </div>
                                                                <div>{item?.pick_up_place}</div>
                                                            </div>
                                                        </div>
                                                        <div className={`${statusConfig[item?.status]?.color} w-fit px-2 py-1 rounded-full flex items-center`}>{statusConfig[item?.status]?.label}</div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Calendar className="h-5 w-5 text-gray-500" />
                                                        <div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                Date
                                                            </div>
                                                            <div>{new Date(item?.datetime).toDateString()}</div>
                                                        </div>
                                                    </div>

                                                    <CartProduct key={index} id={item?.ref_id} quantity={item?.quantity} />

                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {/* <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" /> */}

                                </div>

                                {/* Right Section */}
                                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg space-y-6">
                                    <div className="text-xl text-blue-600 text-center font-bold"> {formatTime(timeLeft)} m</div>
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <div className="font-medium">
                                            We are checking your booking service.
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <Info className="h-4 w-4" />
                                        <div>See our policy for Booking approval process</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 'payment' && (
                    <div className="space-y-4 rounded-xl overflow-hidden">
                        <Payment />
                    </div>
                )}

                {currentStep === 'review' && (
                    <div className="container">



                        <div className="">
                            <div className="space-y-6">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                                    <Mail className="w-8 h-8 text-green-600" />
                                </div>

                                <h2 className="text-2xl font-bold text-center text-gray-900">Booking Confirmation</h2>


                                <div className="space-y-4 text-center">
                                    <h1>Payment Successful!</h1>
                                    <p>Thank you for your purchase!</p>
                                    <p>Your payment has been successfully processed. Here are your details:</p>
                                    <div>
                                        <strong>Session ID:</strong> {session_id}
                                    </div>
                                    <div>
                                        <strong>Amount Paid:</strong>
                                    </div>

                                    <p className="text-gray-700">
                                        The booking ticket / booking confirmation will be sent to your email soon.
                                    </p>
                                    <p className="text-gray-700">
                                        Need any assistance? Please feel free to contact us.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                    <Button color="light" className="w-full sm:w-auto">
                                        <Mail className="mr-2 h-5 w-5" />
                                        Check Email
                                    </Button>
                                    <Button color="blue" className="w-full sm:w-auto">
                                        <Phone className="mr-2 h-5 w-5" />
                                        Contact Us
                                    </Button>
                                </div>

                                <p className="text-sm text-gray-600 text-center">
                                    Thanks so much for using our service!
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 'confirmation' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Booking Confirmed!</h2>
                        <p>Your trip has been booked successfully. Thank you!</p>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    {currentStep !== 'travel-details' && (
                        <Button color="light" onClick={handlePrevStep}>
                            Previous
                        </Button>
                    )}
                    {currentStep !== 'confirmation' ? (
                        <Button onClick={handleNextStep}>Next</Button>
                    ) : (
                        <Button color="success">Download Itinerary</Button>
                    )}
                </div>
            </div>
        </div>
    );
}
const Payment = () => {
    const [bookings, setBookings] = useState<any[] | null>(null); // Use `null` for "not yet loaded"
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    // Fetch booking data from Firestore
    const fetchBookingData = async () => {
        try {
            const userJSON = localStorage.getItem('user');
            if (!userJSON) throw new Error("User not found in localStorage");

            const user = JSON.parse(userJSON);
            const q = query(collection(db, "Bookings"), where("uid", "==", user.uid), where('status', '==', 'approved'));
            const querySnapshot = await getDocs(q);

            const results = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setBookings(results);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setBookings([]); // Fallback to empty bookings on error
        }
    };

    // Fetch client secret for Stripe
    const fetchClientSecret = useCallback(async () => {
        if (!bookings || bookings.length === 0) return alert("Please wait your booking plan approve before payment.");

        try {
            const payload = {
                items: bookings.map((item) => ({
                    product_ref: item.ref_id,
                    quantity: item.quantity
                }))
            };

            console.log("PAYLOAD:", payload);

            const response = await fetch("/api/stripe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            setClientSecret(data.clientSecret);
        } catch (error) {
            console.error("Error fetching client secret:", error);
        }
    }, [bookings]);

    // Fetch bookings on component mount
    useEffect(() => {
        fetchBookingData();
    }, []);

    // Fetch client secret whenever bookings are updated
    useEffect(() => {
        if (bookings !== null) {
            fetchClientSecret();
        }
    }, [bookings, fetchClientSecret]);

    const stripeOptions = clientSecret ? { clientSecret } : undefined;

    return (
        <div id="checkout" className="py-4 bg-[--primary]">
            {/* <div>
                {JSON.stringify(
                    bookings?.map((item) => ({
                        product_ref: item.ref_id,
                        quantity: item.quantity
                    })) || []
                )}
            </div> */}
            {clientSecret ? (
                <EmbeddedCheckoutProvider stripe={stripePromise} options={stripeOptions}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            ) : (
                <div>Loading checkout...</div>
            )}
        </div>
    );
};

