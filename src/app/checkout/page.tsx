'use client'
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { createElement, useCallback, useEffect, useState } from 'react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

import { Button, Card, Label, TextInput, Textarea, Radio, Select } from 'flowbite-react'
import { Calendar, CreditCard, MapPin, User, CheckCircle, Clock, ThumbsUp, DollarSign, Award, Mail, Phone, Loader2, Info } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation';

type CheckoutStep = 'travel-details' | 'passenger-info' | 'payment' | 'review' | 'confirmation';

export default function TravelCheckout() {
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')
    const [currentStep, setCurrentStep] = useState<CheckoutStep>('travel-details');

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
    useEffect(() => {
        console.log("PATH : ", searchParams)
        if (session_id) {
            setCurrentStep('review')
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

    // Format time as mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="container w-[70vw] mx-auto p-4 mt-5">
            <div>
                <h1 className="text-2xl font-bold mb-6">Travel Booking Checkout</h1>

                {/* Step Progress Indicator */}
                <div className="flex flex-col md:flex-row justify-between mb-8 relative">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex flex-col items-center text-center mb-4 md:mb-0 z-10">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= steps.findIndex((s) => s.id === currentStep)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-500'
                                    }`}
                            >
                                {createElement(step.icon, { size: 20 })}
                            </div>
                            <div className="mt-2 text-sm">{step.label}</div>
                        </div>
                    ))}
                    <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-10 hidden md:block" />
                    <div
                        className={`absolute top-5 left-0 h-0.5 bg-blue-600 transition-all duration-500 -z-10 hidden md:block`}
                        style={{
                            width: `${(steps.findIndex((s) => s.id === currentStep) / (steps.length - 1)) * 100}%`,
                        }}
                    />
                </div>

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
                        <Card>
                            <h5 className="text-lg font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-4 rounded-t-lg">
                                Booking detail
                            </h5>
                            <div className="grid md:grid-cols-2 gap-6 p-6">
                                {/* Left Section */}
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Item:</div>
                                        <div className="flex items-start gap-3">
                                            {/* <Boat className="h-5 w-5 text-blue-600 mt-0.5" /> */}
                                            <div>
                                                <div className="font-medium">
                                                    Charter boat: Phi phi island, halfday
                                                </div>
                                                <div className="text-blue-600 font-semibold mt-1">
                                                    4500 THB
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-5 w-5 text-gray-500" />
                                            <div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    Date
                                                </div>
                                                <div>15/12/2024</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-5 w-5 text-gray-500" />
                                            <div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    Pick up at
                                                </div>
                                                <div>Phuket resort hotel</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section */}
                                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg space-y-6">
                                    <div className="text-xl text-blue-600 text-center font-bold"> {formatTime(timeLeft)} m</div>
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <div className="font-medium">
                                            We are processing and checking your booking
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <Info className="h-4 w-4" />
                                        <div>See our policy for Booking approval process</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
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
    const fetchClientSecret = useCallback(() => {
        // Create a Checkout Session
        const payload = {
            "items": [
                {
                    "product_ref": "price_1QLlOHKPeOxP17Ebe5uJ7YtY",
                    "quantity": 1
                }
            ]
        }
        return fetch("/api/stripe", {
            method: "POST",
            body: JSON.stringify(payload)
        })
            .then((res) => res.json())
            .then((data) => data.clientSecret);
    }, []);

    const options = { fetchClientSecret };

    return (
        <div id="checkout" className="py-4 bg-[--primary]">
            <EmbeddedCheckoutProvider

                stripe={stripePromise}
                options={options}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}
