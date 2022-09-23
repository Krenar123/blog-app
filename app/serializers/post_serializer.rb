# frozen_string_literal: true

class PostSerializer < ActiveModel::Serializer
  attributes :id, :content
  has_many :comments
end
