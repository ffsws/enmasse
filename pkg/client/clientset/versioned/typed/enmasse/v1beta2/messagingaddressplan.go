/*
 * Copyright 2018-2019, EnMasse authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

// Code generated by client-gen. DO NOT EDIT.

package v1beta2

import (
	"time"

	v1beta2 "github.com/enmasseproject/enmasse/pkg/apis/enmasse/v1beta2"
	scheme "github.com/enmasseproject/enmasse/pkg/client/clientset/versioned/scheme"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	types "k8s.io/apimachinery/pkg/types"
	watch "k8s.io/apimachinery/pkg/watch"
	rest "k8s.io/client-go/rest"
)

// MessagingAddressPlansGetter has a method to return a MessagingAddressPlanInterface.
// A group's client should implement this interface.
type MessagingAddressPlansGetter interface {
	MessagingAddressPlans(namespace string) MessagingAddressPlanInterface
}

// MessagingAddressPlanInterface has methods to work with MessagingAddressPlan resources.
type MessagingAddressPlanInterface interface {
	Create(*v1beta2.MessagingAddressPlan) (*v1beta2.MessagingAddressPlan, error)
	Update(*v1beta2.MessagingAddressPlan) (*v1beta2.MessagingAddressPlan, error)
	UpdateStatus(*v1beta2.MessagingAddressPlan) (*v1beta2.MessagingAddressPlan, error)
	Delete(name string, options *v1.DeleteOptions) error
	DeleteCollection(options *v1.DeleteOptions, listOptions v1.ListOptions) error
	Get(name string, options v1.GetOptions) (*v1beta2.MessagingAddressPlan, error)
	List(opts v1.ListOptions) (*v1beta2.MessagingAddressPlanList, error)
	Watch(opts v1.ListOptions) (watch.Interface, error)
	Patch(name string, pt types.PatchType, data []byte, subresources ...string) (result *v1beta2.MessagingAddressPlan, err error)
	MessagingAddressPlanExpansion
}

// messagingAddressPlans implements MessagingAddressPlanInterface
type messagingAddressPlans struct {
	client rest.Interface
	ns     string
}

// newMessagingAddressPlans returns a MessagingAddressPlans
func newMessagingAddressPlans(c *EnmasseV1beta2Client, namespace string) *messagingAddressPlans {
	return &messagingAddressPlans{
		client: c.RESTClient(),
		ns:     namespace,
	}
}

// Get takes name of the messagingAddressPlan, and returns the corresponding messagingAddressPlan object, and an error if there is any.
func (c *messagingAddressPlans) Get(name string, options v1.GetOptions) (result *v1beta2.MessagingAddressPlan, err error) {
	result = &v1beta2.MessagingAddressPlan{}
	err = c.client.Get().
		Namespace(c.ns).
		Resource("messagingaddressplans").
		Name(name).
		VersionedParams(&options, scheme.ParameterCodec).
		Do().
		Into(result)
	return
}

// List takes label and field selectors, and returns the list of MessagingAddressPlans that match those selectors.
func (c *messagingAddressPlans) List(opts v1.ListOptions) (result *v1beta2.MessagingAddressPlanList, err error) {
	var timeout time.Duration
	if opts.TimeoutSeconds != nil {
		timeout = time.Duration(*opts.TimeoutSeconds) * time.Second
	}
	result = &v1beta2.MessagingAddressPlanList{}
	err = c.client.Get().
		Namespace(c.ns).
		Resource("messagingaddressplans").
		VersionedParams(&opts, scheme.ParameterCodec).
		Timeout(timeout).
		Do().
		Into(result)
	return
}

// Watch returns a watch.Interface that watches the requested messagingAddressPlans.
func (c *messagingAddressPlans) Watch(opts v1.ListOptions) (watch.Interface, error) {
	var timeout time.Duration
	if opts.TimeoutSeconds != nil {
		timeout = time.Duration(*opts.TimeoutSeconds) * time.Second
	}
	opts.Watch = true
	return c.client.Get().
		Namespace(c.ns).
		Resource("messagingaddressplans").
		VersionedParams(&opts, scheme.ParameterCodec).
		Timeout(timeout).
		Watch()
}

// Create takes the representation of a messagingAddressPlan and creates it.  Returns the server's representation of the messagingAddressPlan, and an error, if there is any.
func (c *messagingAddressPlans) Create(messagingAddressPlan *v1beta2.MessagingAddressPlan) (result *v1beta2.MessagingAddressPlan, err error) {
	result = &v1beta2.MessagingAddressPlan{}
	err = c.client.Post().
		Namespace(c.ns).
		Resource("messagingaddressplans").
		Body(messagingAddressPlan).
		Do().
		Into(result)
	return
}

// Update takes the representation of a messagingAddressPlan and updates it. Returns the server's representation of the messagingAddressPlan, and an error, if there is any.
func (c *messagingAddressPlans) Update(messagingAddressPlan *v1beta2.MessagingAddressPlan) (result *v1beta2.MessagingAddressPlan, err error) {
	result = &v1beta2.MessagingAddressPlan{}
	err = c.client.Put().
		Namespace(c.ns).
		Resource("messagingaddressplans").
		Name(messagingAddressPlan.Name).
		Body(messagingAddressPlan).
		Do().
		Into(result)
	return
}

// UpdateStatus was generated because the type contains a Status member.
// Add a +genclient:noStatus comment above the type to avoid generating UpdateStatus().

func (c *messagingAddressPlans) UpdateStatus(messagingAddressPlan *v1beta2.MessagingAddressPlan) (result *v1beta2.MessagingAddressPlan, err error) {
	result = &v1beta2.MessagingAddressPlan{}
	err = c.client.Put().
		Namespace(c.ns).
		Resource("messagingaddressplans").
		Name(messagingAddressPlan.Name).
		SubResource("status").
		Body(messagingAddressPlan).
		Do().
		Into(result)
	return
}

// Delete takes name of the messagingAddressPlan and deletes it. Returns an error if one occurs.
func (c *messagingAddressPlans) Delete(name string, options *v1.DeleteOptions) error {
	return c.client.Delete().
		Namespace(c.ns).
		Resource("messagingaddressplans").
		Name(name).
		Body(options).
		Do().
		Error()
}

// DeleteCollection deletes a collection of objects.
func (c *messagingAddressPlans) DeleteCollection(options *v1.DeleteOptions, listOptions v1.ListOptions) error {
	var timeout time.Duration
	if listOptions.TimeoutSeconds != nil {
		timeout = time.Duration(*listOptions.TimeoutSeconds) * time.Second
	}
	return c.client.Delete().
		Namespace(c.ns).
		Resource("messagingaddressplans").
		VersionedParams(&listOptions, scheme.ParameterCodec).
		Timeout(timeout).
		Body(options).
		Do().
		Error()
}

// Patch applies the patch and returns the patched messagingAddressPlan.
func (c *messagingAddressPlans) Patch(name string, pt types.PatchType, data []byte, subresources ...string) (result *v1beta2.MessagingAddressPlan, err error) {
	result = &v1beta2.MessagingAddressPlan{}
	err = c.client.Patch(pt).
		Namespace(c.ns).
		Resource("messagingaddressplans").
		SubResource(subresources...).
		Name(name).
		Body(data).
		Do().
		Into(result)
	return
}
